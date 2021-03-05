import fs from 'fs'
import path from 'path'
import FormData from 'form-data'
import {request} from '../request'
import {mkdir} from './mkdir'
import config from '../../.lanzou.json'
import {split} from '../util/split'

export interface UploadOption {
  path: string
  size?: number // 文件大小（如果外部传入则不会重新读取）
  name?: string // 文件名称（如果外部传入则不会重新读取）
  type?: string // 文件类型（如果外部传入则不会重新读取）
  lastModifiedDate?: Date // 文件类型（如果外部传入则不会重新读取）

  folderId?: string
  onStateChange?: () => void
  onProgress?: (resolve: number, total: number) => void
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
 */
export async function upload(option: UploadOption) {
  if (!(option.size && option.name)) {
    const stat = await fs.statSync(option.path)
    option.size = option.size || stat.size
    option.name = option.name || path.basename(option.path)
    option.lastModifiedDate = option.lastModifiedDate || stat.mtime
  }
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
    // todo: mkdir 之前先 ls option.folderId 的目录下没有 file.name 的文件夹，有则返回
    const folderId = await mkdir({
      parentId: option.folderId,
      folderName: file.name,
    })
    file.list = file.list.map(value => ({...value, folderId}))
  }

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
      // onData: bytes => {
      //   console.log(`${byteToSize(bytes)} / ${byteToSize(item.size)}`)
      // },
    })
    if (response.zt == 1 && response.text?.length) {
      console.log(response.text.map(value => `上传成功: ${value.f_id}, ${value.name_all}`))
    }
  }
}
