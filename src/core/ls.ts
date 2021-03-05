import {delay, html, match, parseUrl} from '../util/utils'
import {request} from '../request'

export interface LsShareOption {
  url: string
  pwd?: string
  /**
   * 限制最大页数，默认不限制
   */
  limit?: number
}

export interface FileList extends UrlFile {
  html?: string
  list: UrlFile[]
}

export interface UrlFile {
  name: string
  id: string
  url: string
  size: string
  pwd?: string
  type?: 'file' | 'dir'
}

/**
 * 列出分享文件
 */
export async function lsShareUrl(option: LsShareOption): Promise<FileList> {
  const {id, origin} = parseUrl(option.url)
  const shareHTML = await html(option.url)
  const iframe = match.iframe(shareHTML)
  const data = match.data(shareHTML)
  const ls = match.ls(shareHTML)
  const fid = match.fid(shareHTML)

  const file: FileList = {
    name: '',
    size: '',
    id,
    url: option.url,
    pwd: option.pwd,
    type: 'file',
    html: shareHTML,
    list: [],
  }
  // 无密码文件
  if (iframe) {
    file.name = match.titleWithoutPwd(shareHTML)
    file.size = match.sizeWithoutPwd(shareHTML)
    const {html, list, ...rest} = file
    file.list = [rest]

    return file
    // 密码文件
  } else if (data) {
    if (!option.pwd) throw new Error('密码为空')
    // 请求网页主要为了获取文件名
    const {response} = await request<PwdShareFile>(`${origin}/ajaxm.php`, {
      headers: {referer: option.url},
      body: data + option.pwd,
    })
    file.name = response.inf
    file.size = match.sizeWithPwd(shareHTML)
    const {html, list, ...rest} = file
    file.list = [rest]

    return file
    // [密码]文件夹
  } else if (fid) {
    const isPwd = !!ls

    if (isPwd && !option.pwd) throw new Error('密码为空')

    const title = match.title(shareHTML)
    const lx = match.lx(shareHTML)
    const uid = match.uid(shareHTML)
    const rep = match.rep(shareHTML)
    const t = match.t(shareHTML)
    const k = match.k(shareHTML)
    const up = match.up(shareHTML)
    let pg = 1

    file.type = 'dir'
    file.name = title
    while (true) {
      const {response} = await request<LzResponse<ShareFolderFile[]>>(`${origin}/filemoreajax.php`, {
        body: {lx, fid, uid, rep, t, k, up, pg: pg++, ...(isPwd ? {ls, pwd: option.pwd} : {})},
      })

      if (response.zt == 1 && response.text?.length) {
        file.list.push(
          ...response.text.map<UrlFile>(item => {
            const url = `${origin}/${item.id}`
            const {id} = parseUrl(url)
            return {name: item.name_all, id, url, size: item.size, type: 'file', pwd: ''}
          })
        )
        await delay(2000)
      } else break
      if (option.limit > 0 && pg > option.limit) break
    }
    return file
  } else {
    throw new Error('页面解析出错，文件可能取消分享了')
  }
}

// const option = {url: 'https://wws.lanzous.com/b01u134hc', pwd: 'a02g'} // 图片
// const option = {url: 'https://wws.lanzous.com/b01tpeg7i'} // pan
// const option = {url: 'https://wws.lanzous.com/iwsPQmg5sfg', pwd: 'g24j'} // pwd file
// const option = {url: 'https://wws.lanzous.com/iIsdEmg3iti'} // 压缩文件

// const option = {url: 'https://wws.lanzous.com/b01tpej7g', pwd: '8cup'} // 165

// lsShareUrl(option).then(async value => {
//   for (const item of value.list) {
//     const handle = download({
//       ...item,
//       path: item.name,
//       onStateChange: value1 => {
//         console.log(value1)
//       },
//     })
//     await handle.promise.catch(reason => console.log(reason))
//     console.log(`finish: `, item.name)
//   }
// })

export interface FolderDir {
  type: 'dir'
  folderId: string
  description: string
  name: string
  pwd: string // ls 的时候没有，需要请求接口获取
  url: string // 分享的 url
  id: string // url 后面的 id
}

export interface FolderFile {
  type: 'file'
  fileId: string
  name: string
  pwd: string // ls 的时候没有，需要请求接口获取
  url: string // 分享的 url
  id: string // url 后面的 id
  downs: string // 下载次数
  size: string // 易于阅读的大小 13.2 M
  time: string // 字符串日期
}

export function lsDir(folderId: string): Promise<FolderDir[]> {
  return request<LzResponse<Task47Data[]>, Task47>('https://up.woozooo.com/doupload.php', {
    body: {task: 47, folder_id: folderId},
  }).then(
    ({response}) =>
      response.text?.map?.(value => ({
        type: 'dir',
        folderId: value.fol_id,
        name: value.name,
        description: value.folder_des,
        id: '',
        url: '',
        pwd: '',
      })) ?? []
  )
}

async function lsFile(folderId: string, limit: number): Promise<FolderFile[]> {
  let pg = 1
  const list: FolderFile[] = []
  while (true) {
    const {response} = await request<LzResponse<Task5Data[]>, Task5>('https://up.woozooo.com/doupload.php', {
      body: {task: 5, folder_id: folderId, pg: pg++},
    })
    if (response.zt == 1 && response.text?.length) {
      list.push(
        ...response.text.map<FolderFile>(value => ({
          type: 'file',
          fileId: value.id,
          name: value.name_all,
          downs: value.downs,
          size: value.size,
          time: value.time,
          pwd: '',
          url: '',
          id: '',
        }))
      )
    } else break
    if (limit > 0 && pg > limit) break
  }

  return list
}

export interface LsFolderOption {
  folderId?: string
  limit?: number // 只限制文件页数，不显示文件夹数量
}

/**
 * 列出文件夹下的 文件夹和文件
 * @example
 ```
 await lsFolder({folderId, limit: 1})
 ```
 */
export async function lsFolder(option: LsFolderOption): Promise<(FolderDir | FolderFile)[]> {
  const [dir, file] = await Promise.all([lsDir(option.folderId), lsFile(option.folderId, option.limit)])
  return [...dir, ...file]
}
