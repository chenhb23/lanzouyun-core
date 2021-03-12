export interface StatefulPromise<T> extends Promise<T> {
  cancel: () => void
}

export interface HttpOptions<B> {
  url: string
  method: 'post' | 'get' | 'POST' | 'GET'
  headers?: Record<string, any>
  body?: B
  onProgress?: (received: number) => void
}
export interface HttpResponse<T> {
  json: () => Promise<T>
  text: () => Promise<string>
  headers?: Record<string, any>
}

export interface HttpDownloadOptions {
  url: string
  path: string
  onProgress?: (received: number, total: number) => void
}

export interface HttpUploadOptions {
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

  abstract download(options: HttpDownloadOptions): StatefulPromise<void>

  abstract upload(options: HttpUploadOptions): StatefulPromise<any>

  urlCache = {
    xxxxxxxx: {
      url: '',
      expire: new Date(),
    },
  }
}

export const baseHeaders = {
  accept: 'application/json, text/javascript, */*; q=0.01',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'accept-language': 'zh-CN,zh;q=0.9',
  pragma: 'no-cache',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
}
