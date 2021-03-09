// import fs from 'fs'
import {sizeToByte} from './utils'
// import path from 'path'
// import os from 'os'
// import config from '../../.lanzou.json'
import config from '../config'
import {common} from '../common'

export interface SplitOption {
  path: string
  splitSize?: string | number
  maxSize?: string | number
  /**
   * 仅返回分割结果，不进行实际操作，节省存储空间
   */
  skipSplit?: boolean
  /**
   * 输出目录，默认文件当前（临时？）目录
   */
  outputPath?: string
}

export interface SplitData {
  isFile: boolean
  path: string
  name: string
  size: number
  lastModifiedDate: Date
  files: {
    path: string // 新地址，如果没有分割，则与 SplitData.path 相同
    sourcePath: string // 原始地址与 SplitData.path 相同
    name: string
    size: number
    lastModifiedDate: Date
    startByte?: number
    endByte?: number
  }[]
}

/**
 * @example
 ```
  split({
    path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png',
    splitSize: '100k',
    maxSize: '100k',
  }).then(value => {
    console.log('finish')
  })
 ```
 */
export async function split(option: SplitOption): Promise<SplitData> {
  if (!option.path || !(await common.fs.exists(option.path))) {
    throw new Error('文件路径为空或不存在')
  }
  // option.path = path.resolve(option.path)
  const resolvePath = await common.path.resolve(option.path)
  const fstat = await common.fs.stat(resolvePath)
  if (!fstat.isFile) {
    throw new Error('该地址不是文件文件')
  }

  const fSize = fstat.size
  const maxSize = sizeToByte(option.maxSize ?? config.maxSize)
  const fName = common.path.basename(resolvePath)
  const splitData: SplitData = {
    path: resolvePath,
    name: fName,
    size: fSize,
    isFile: true,
    lastModifiedDate: fstat.mtime,
    files: [],
  }

  // 不用分割
  if (fSize <= maxSize) {
    const {files, ...rest} = splitData
    splitData.files = [{...rest, name: encodeName(rest.name), sourcePath: resolvePath}]
    return splitData
  }

  // const outputPath = path.resolve(option.outputPath ?? path.basename(option.path, path.extname(option.path)))
  // todo:
  const outputPath = option.outputPath
    ? await common.fs
        .exists(option.outputPath)
        .then(value => (!value ? option.outputPath : common.path.resolve(option.outputPath)))
    : common.path.join(common.fs.cacheDir, common.path.basename(option.path, common.path.extname(option.path)))

  splitData.isFile = false
  if (!option.skipSplit && !(await common.fs.exists(outputPath))) {
    await common.fs.mkdir(outputPath)
  }

  const splitSize = sizeToByte(option.splitSize ?? config.splitSize)
  const splitFileNum = Math.ceil(fSize / splitSize)
  for (let i = 0; i < splitFileNum; i++) {
    const indexName = encodeIndexName(fName, i) // 分割的文件自动转换拓展名
    const writePath = common.path.join(outputPath, indexName)
    const startByte = splitSize * i
    const endByte = Math.min(fSize, splitSize * (i + 1) - 1)
    const file: SplitData['files'][number] = {
      path: writePath,
      sourcePath: option.path,
      size: endByte - startByte,
      name: indexName,
      lastModifiedDate: splitData.lastModifiedDate,
      startByte,
      endByte,
    }
    splitData.files.push(file)
  }
  if (!option.skipSplit) {
    await Promise.all(
      splitData.files.map(value =>
        common.fs.writeFile({
          source: value.sourcePath,
          target: value.path,
          start: value.startByte,
          end: value.endByte,
        })
      )
    )
  }
  return splitData
}

// export interface WriteOption {
//   target: string
//   source: string
//   start: number
//   end: number
// }

// export function writeFile(option: WriteOption) {
//   return new Promise((resolve, reject) => {
//     const rs = fs.createReadStream(option.source, option.end ? {start: option.start, end: option.end} : undefined)
//     const ws = fs.createWriteStream(option.target)
//     ws.on('close', resolve)
//     ws.on('error', reject)
//     rs.on('error', reject)
//     rs.pipe(ws)
//   })
// }

export function encodeName(filename: string) {
  if (!config.supportExt.includes(common.path.extname(filename))) {
    return filename + config.signSuffix
  }
  return filename
}

/**
 * 如果是支持的后缀，仅添加 index? 其实也是读取不出来的
 */
export function encodeIndexName(filename: string, index: number) {
  return `${filename}.${`${index}`.padStart(3, '0')}${config.signSuffix}`
}

const reg = new RegExp(`(.\\d+)?${config.signSuffix}$`)

export function decodeName(filename: string) {
  if (reg.test(filename)) {
    return filename.replace(reg, '')
  }
  return filename
}
