import {parseUrl, html, match} from '../util/utils'
import {Event} from '../util/Event'
import {Chain} from '../util/Chain'
import {common, HttpDownloadData, StatefulPromise} from '../common'
// import {PwdShareFile} from '../types/type'

export interface PageOptions {
  /**
   * 分享页面的 url
   */
  url: string
  /**
   * 如果传入 html，则跳过页面的解析过程
   */
  html?: string
  /**
   * 密码
   */
  pwd?: string
}

/**
 * 页面的下载链接（还不是 nginx 的真实下载链接）
 */
export async function getPageDownloadUrl(option: PageOptions): Promise<string> {
  const {origin} = parseUrl(option.url)
  const shareHTML = option.html || (await html(option.url))

  const iframe = match.iframe(shareHTML)
  const data = match.data(shareHTML)

  if (iframe) {
    const iframeUrl = `${origin}${iframe}`

    const downHTML = await html(iframeUrl)
    // const sign = match.sign(downHTML)
    const signs = match.signs(downHTML)
    const websign = match.websign(downHTML)
    const ves = match.ves(downHTML)
    const postdown = match.postdown(downHTML)
    const websignkey = match.websignkey(downHTML)

    const response = await common.http
      .request<PwdShareFile>({
        url: `${origin}/ajaxm.php`,
        method: 'post',
        headers: {referer: iframeUrl}, // 获取下载链接需要 referer，防盗链
        body: {action: 'downprocess', signs, sign: postdown, ves, websign, websignkey},
      })
      .then(value => value.json())
    return `${response.dom}/file/${response.url}`
  } else if (data) {
    if (!option.pwd) throw new Error('密码为空')
    const response = await common.http
      .request<PwdShareFile>({
        url: `${origin}/ajaxm.php`,
        method: 'post',
        headers: {referer: option.url},
        body: data + option.pwd,
      })
      .then(value => value.json())
    return `${response.dom}/file/${response.url}`
  } else {
    throw new Error('页面错误')
  }
}

/**
 * 需要设置 header accept: application/octet-stream
 */
export function getRealDownloadUrl(pageDownloadUrl: string): Promise<string> {
  return common.http
    .request({
      url: pageDownloadUrl,
      method: 'GET',
      headers: {accept: 'application/octet-stream, */*; q=0.01'},
      followRedirect: false,
    })
    .then(({headers}) => {
      // console.log(headers)
      return headers.location
    })
}

export interface DownloadOption {
  url: string
  /**
   * 保存的路径，如果缺省则保存到临时目录
   */
  path?: string

  pwd?: string
  onStateChange?: (
    value:
      | {state: 1 | 2; url: string} // 1: 获取页面下载地址, 2: 获取真实下载地址
      | {state: 3; length: number; disposition: string} // 3: 开始下载
      | {state: 4} // 4: 下载结束
      | {state: 5} // 5: 下载出错
      | {state: 6} // 5: 取消下载
  ) => void
  /**
   * 进度回调
   */
  onProgress?: (resolveBytes: number, totalBytes: number) => void
}

/**
 * @example
 * ```
 const handle = download({
   url,
   path: 'src/assets/test.png',
   onProgress: (resolve, total) => {
     console.log(`${resolve} / ${total}`)
   },
 })
 setTimeout(() => handle.cancel(), 1000)
 await handle
 * ```
 * @param option
 */
export function download(option: DownloadOption) {
  const event = new Event()
  const promise = new Promise((resolve, reject) => {
    const chain = new Chain()
    event.once('cancel', () => {
      chain.cancel()
      // option.onStateChange?.({state: 6})
      reject('取消下载')
    })

    chain
      .add(() => getPageDownloadUrl(option))
      .add(url => (option.onStateChange?.({state: 1, url}), url))
      .add(url => getRealDownloadUrl(url))
      .add(realUrl => (option.onStateChange?.({state: 2, url: realUrl}), realUrl))
      .add(realUrl => {
        // todo: 事件节流, onStateChange
        const handle = common.http.download({
          url: realUrl,
          path: option.path,
          onProgress: option.onProgress,
        })
        event.once('cancel', handle.cancel)
        handle.then(resolve, reject)
      })
      .start()
  }) as StatefulPromise<HttpDownloadData>
  promise.cancel = () => event.emit('cancel')

  return promise
}
