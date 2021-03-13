// import fs, {WriteStream} from 'fs'
import {common} from '../common'

// function writeFile(source: string, target: WriteStream) {
//   return new Promise<void>((resolve, reject) => {
//     const rs = fs.createReadStream(source)
//     rs.on('close', resolve)
//     rs.on('error', reject)
//     rs.pipe(target, {end: false})
//   })
// }

export interface MergeOption {
  path: string | string[]
  outputPath: string // 完整路径，带文件名
}

/**
 * @example
 ```
  merge({
    path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7',
    outputPath: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png',
  }).then(console.log)
 ```
 */
export async function merge(option: MergeOption) {
  if (!option.path?.length) {
    throw new Error('文件路径不能为空')
  }

  let paths: string[] = []
  const outputPath = await common.path.resolve(option.outputPath)
  if (typeof option.path === 'string') {
    const source = await common.path.resolve(option.path)
    const stat = await common.fs.stat(source)
    if (stat.isFile) return true // 文件无需合并

    paths = (await common.fs.readdir(source)).map(value => common.path.join(source, value))
    if (!paths.length) return false // 没有文件可以合并
  } else paths = option.path

  const resolvePath = common.path.dirname(outputPath)
  if (!(await common.fs.exists(resolvePath))) {
    await common.fs.mkdir(resolvePath, {recursive: true})
  }

  // const ws = fs.createWriteStream(option.outputPath, {flags: 'w'})
  // for (const file of paths) {
  for (let i = 0; i < paths.length; i++) {
    const file = paths[i]
    await common.fs.copy({
      source: option.outputPath,
      target: file,
      flags: i === 0 ? 'w' : 'a',
    })
    // await writeFile(file, ws);
  }
  return true
}
