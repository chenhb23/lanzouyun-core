import {parseUrl, html, match} from '../util/utils'
import {Event} from '../util/Event'
import {Chain} from '../util/Chain'
import {common, StatefulPromise} from '../common'

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
    const sign = match.sign(downHTML)
    const signs = match.signs(downHTML)
    const websign = match.websign(downHTML)
    const ves = match.ves(downHTML)

    // const {response} = await request<PwdShareFile>(`${origin}/ajaxm.php`, {
    const response = await common.http
      .request<PwdShareFile>({
        url: `${origin}/ajaxm.php`,
        method: 'post',
        headers: {referer: iframeUrl}, // 获取下载链接需要 referer，防盗链
        body: {action: 'downprocess', signs, sign, ves, websign},
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
export function getRealDownloadUrl(pageDownloadUrl: string) {
  return common.http
    .request({url: pageDownloadUrl, method: 'GET', headers: {accept: 'application/octet-stream, */*; q=0.01'}})
    .then(({headers}) => headers.location)
}

export interface DownloadOption {
  url: string
  /**
   * 保存的路径
   */
  path: string

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
  const promise = new Promise<void>((resolve, reject) => {
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
        // todo: download
        const handle = common.http.download({
          url: realUrl,
          path: option.path,
        })
        event.once('cancel', handle.cancel)
        return handle

        // https.get(realUrl, res => {
        //   const total = +res.headers['content-length']
        //   const fileName = decodeURIComponent(
        //     res.headers['content-disposition'].split(';')?.[1]?.split('filename=')?.[1]?.trim()
        //   )
        //   option.onStateChange?.({state: 3, length: total, disposition: fileName})
        //
        //   fs.mkdirSync(path.dirname(option.path), {recursive: true})
        //   const file = fs.createWriteStream(option.path)
        //
        //   event.once('cancel', () => {
        //     res.destroy()
        //     file.destroy()
        //   })
        //
        //   // todo: 事件节流
        //   let len = 0
        //   res.on('data', chunk => option.onProgress?.((len += chunk.length), total))
        //   res.on('end', () => {
        //     file.end() // 将内存中的内容全部写入，然后关闭文件
        //     option.onStateChange?.({state: 4})
        //     resolve()
        //   })
        //   res.on('error', () => {
        //     option.onStateChange?.({state: 5})
        //     reject()
        //   })
        //   res.pipe(file)
        // })
      })
      .start()
  }) as StatefulPromise<void>
  promise.cancel = () => event.emit('cancel')

  return promise
}
