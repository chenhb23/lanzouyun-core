export interface StatefulPromise<T> extends Promise<T> {
  cancel: () => void
}

export interface HttpOptions<B> {
  url: string
  method: 'post' | 'get' | 'POST' | 'GET'
  headers?: Record<string, any>
  body?: B
  onProgress?: (received: number) => void
  /**
   * @default true
   */
  followRedirect?: boolean
}
export interface HttpResponse<T> {
  json: () => Promise<T>
  text: () => Promise<string>
  headers?: Record<string, any>
}

export interface HttpDownloadOptions {
  /**
   * 真实的下载链接
   */
  url: string
  path?: string
  onProgress?: (received: number, total: number) => void
}

export interface HttpDownloadData {
  name: string
  path: string
  size: number
}

export interface HttpUploadOptions {
  /**
   * 上传文件的路径
   */
  path: string
  folderId: string
  start?: number
  end?: number

  size?: number
  name?: string
  mtime?: Date
}

export abstract class HttpBase {
  // abstract get<T, B>(option: HttpOption<B>): Promise<T>
  // abstract post<T, B>(option: HttpOption<B>): Promise<T>
  abstract request<T = any, B = any>(options: HttpOptions<B>): StatefulPromise<HttpResponse<T>>

  abstract download(options: HttpDownloadOptions): StatefulPromise<HttpDownloadData>

  abstract upload(options: HttpUploadOptions): StatefulPromise<any>
}

export const baseHeaders = {
  accept: 'application/json, text/javascript, */*; q=0.01',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'accept-language': 'zh-CN,zh;q=0.9',
  pragma: 'no-cache',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
}
