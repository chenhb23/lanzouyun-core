import {mkdir} from './mkdir'
// import config from '../../.lanzou.json'
import config from '../config'
import {split} from '../util/split'
import {FolderDir, lsFolder} from './ls'
import {common} from '../common'

export interface UploadOption {
  path: string

  folderId?: string
  onStateChange?: () => void
  onProgress?: (value: {
    resolveBytes: number
    totalBytes: number
    currentResolveBytes: number
    currentTotalBytes: number
    name: string
    current: number // 当前第几个文件, todo: 参数
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
 * 确保目录存在，并返回 folderId
 * 默认查找 -1 的目录
 */
async function ensureFolder(option: {folderId: string; folderName: string}): Promise<string> {
  const folder = (await lsFolder({folderId: option.folderId || '-1', limit: 1})).find(
    value => value.type === 'directory' && value.name === option.folderName
  )
  return folder ? (folder as FolderDir).folderId : mkdir({parentId: option.folderId, folderName: option.folderName})
}

/**
 * 上传文件或文件夹
 */
export async function upload(option: UploadOption) {
  const resolvePath = await common.path.resolve(option.path)
  const stat = await common.fs.stat(resolvePath)

  if (stat.isDirectory) {
    const folderId = await ensureFolder({folderId: option.folderId, folderName: common.path.basename(resolvePath)})
    let dirs = (await common.fs.readdir(resolvePath)).map(value => common.path.join(resolvePath, value))
    const stats = await Promise.all(dirs.map(value => common.fs.stat(value)))
    dirs = dirs.filter((_, index) => stats[index]?.isFile)
    for (const dir of dirs) {
      await uploadFile({...option, folderId, path: dir})
    }
  } else {
    await uploadFile(option)
  }
}

/**
 * @example
 ```
  login().then(() => {
    uploadFile({path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png'})
  })
 ```
 */
export async function uploadFile(option: UploadOption) {
  const resolvePath = await common.path.resolve(option.path)
  const stat = await common.fs.stat(resolvePath)
  const name = common.path.basename(resolvePath)
  const size = stat.size
  const lastModifiedDate = stat.mtime
  const folderId = option.folderId || '-1'

  const file: UploadList = {
    type: '',
    size,
    name,
    lastModifiedDate: lastModifiedDate,
    folderId,
    path: resolvePath,
    list: [],
  }
  const splitData = await split({
    path: resolvePath,
    splitSize: config.splitSize,
    maxSize: config.maxSize,
    // splitSize: '50m',
    // maxSize: '98m',
    skipSplit: true,
  })
  file.list = splitData.files.map(value => ({
    lastModifiedDate: value.lastModifiedDate,
    type: '',
    folderId,
    size: value.size,
    name: value.name,
    path: value.sourcePath,
    startByte: value.startByte,
    endByte: value.endByte,
  }))

  if (file.list.length > 1) {
    const id = await ensureFolder({folderId, folderName: file.name})
    file.list = file.list.map(value => ({...value, folderId: id}))
  }

  const total = file.list.reduce((prev, value) => prev + value.size, 0)
  let finished = 0
  for (let i = 0; i < file.list.length; i++) {
    const item = file.list[i]
    const response = await common.http.upload({
      ...(item.endByte ? {end: item.endByte, start: item.startByte} : {}),
      folderId: item.folderId,
      mtime: item.lastModifiedDate,
      name: item.name,
      path: item.path,
      size: item.size,
    })
    // const fr = fs.createReadStream(item.path, item.endByte ? {start: item.startByte, end: item.endByte} : undefined)
    // const form = new FormData()
    // form.append('task', '1')
    // form.append('ve', '2')
    // form.append('lastModifiedDate', item.lastModifiedDate.toString()) // 没有 toString 会报错
    // form.append('type', item.type || 'application/octet-stream')
    // form.append('id', `WU_FILE_${i}`)
    // form.append('folder_id_bb_n', item.folderId || -1)
    // form.append('size', item.size)
    // form.append('name', item.name)
    // form.append('upload_file', fr, item.name)
    //
    // const response = await common.http
    //   .request<LzResponse<UploadRes[]>>({
    //     url: `https://up.woozooo.com/fileup.php`,
    //     method: 'post',
    //     body: form,
    //     // ...(typeof option.onProgress === 'function'
    //     //   ? {
    //     //       onData: bytes => {
    //     //         option.onProgress({
    //     //           resolveBytes: finished + bytes,
    //     //           totalBytes: total,
    //     //           currentResolveBytes: bytes,
    //     //           currentTotalBytes: item.size,
    //     //           name: item.name,
    //     //           current: i + 1,
    //     //           length: file.list.length,
    //     //         })
    //     //       },
    //     //     }
    //     //   : {}),
    //   })
    //   .then(value => value.json())
    if (response.zt == 1 && response.text?.length) {
      finished += item.size
      console.log(response.text.map(value => `上传成功: ${value.f_id}, ${value.name_all}`))
    }
  }
}
