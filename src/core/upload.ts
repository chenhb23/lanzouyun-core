import fs from 'fs'
import path from 'path'
import FormData from 'form-data'
import {request} from '../request'
import {mkdir} from './mkdir'
import config from '../../.lanzou.json'
import {split} from '../util/split'
import {FolderDir, lsFolder} from './ls'

export interface UploadOption {
  path: string
  size?: number // 文件大小（如果外部传入则不会重新读取）
  name?: string // 文件名称（如果外部传入则不会重新读取）
  type?: string // 文件类型（如果外部传入则不会重新读取）
  lastModifiedDate?: Date // 文件类型（如果外部传入则不会重新读取）

  folderId?: string
  onStateChange?: () => void
  onProgress?: (value: {
    resolveBytes: number
    totalBytes: number
    currentResolveBytes: number
    currentTotalBytes: number
    name: string
    current: number // 当前第几个文件
    length: number
  }) => void
}

interface UploadFile {
  lastModifiedDate: Date
  type: string
  folderId: string
  size: number
  name: string
  path: string
  startByte?: number
  endByte?: number
}

interface UploadList extends UploadFile {
  list: UploadFile[]
}

/**
 * @example
 ```
  login().then(() => {
    upload({path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png'})
  })
 ```
 * todo: 支持上传文件夹
 */
export async function upload(option: UploadOption) {
  if (!(option.size && option.name)) {
    const stat = await fs.statSync(option.path)
    option.size = option.size || stat.size
    option.name = option.name || path.basename(option.path)
    option.lastModifiedDate = option.lastModifiedDate || stat.mtime
  }
  option.folderId = option.folderId || '-1'

  const file: UploadList = {
    lastModifiedDate: option.lastModifiedDate,
    type: option.type,
    folderId: option.folderId,
    size: option.size,
    name: option.name,
    path: option.path,
    list: [],
  }
  const splitData = await split({
    path: option.path,
    splitSize: config.splitSize,
    maxSize: config.maxSize,
    // splitSize: '100k',
    // maxSize: '100k',
    skipSplit: true,
  })
  file.list = splitData.files.map(value => ({
    lastModifiedDate: value.lastModifiedDate,
    type: '',
    folderId: '',
    size: value.size,
    name: value.name,
    path: value.sourcePath,
    startByte: value.startByte,
    endByte: value.endByte,
  }))

  if (file.list.length > 1) {
    const list = await lsFolder({folderId: option.folderId, limit: 1})
    const item = list.find(value => value.type === 'dir' && value.name === file.name)

    const folderId = item
      ? (item as FolderDir).folderId
      : await mkdir({
          parentId: option.folderId,
          folderName: file.name,
        })
    file.list = file.list.map(value => ({...value, folderId}))
  }

  const total = file.list.reduce((prev, value) => prev + value.size, 0)
  let finished = 0
  for (let i = 0; i < file.list.length; i++) {
    const item = file.list[i]
    const fr = fs.createReadStream(item.path, item.endByte ? {start: item.startByte, end: item.endByte} : undefined)
    const form = new FormData()
    form.append('task', '1')
    form.append('ve', '2')
    form.append('lastModifiedDate', item.lastModifiedDate.toString()) // 没有 toString 会报错
    form.append('type', item.type || 'application/octet-stream')
    form.append('id', `WU_FILE_${i}`)
    form.append('folder_id_bb_n', item.folderId || -1)
    form.append('size', item.size)
    form.append('name', item.name)
    form.append('upload_file', fr, item.name)

    const {response} = await request<LzResponse<UploadRes[]>>(`https://up.woozooo.com/fileup.php`, {
      body: form,
      ...(typeof option.onProgress === 'function'
        ? {
            onData: bytes => {
              option.onProgress({
                resolveBytes: finished + bytes,
                totalBytes: total,
                currentResolveBytes: bytes,
                currentTotalBytes: item.size,
                name: item.name,
                current: i + 1,
                length: file.list.length,
              })
            },
          }
        : {}),
    })
    if (response.zt == 1 && response.text?.length) {
      finished += item.size
      console.log(response.text.map(value => `上传成功: ${value.f_id}, ${value.name_all}`))
    }
  }
}
