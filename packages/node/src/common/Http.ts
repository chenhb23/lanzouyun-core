import https from 'https'
import FormData from 'form-data'
import querystring from 'querystring'
import {
  baseHeaders,
  common,
  HttpBase,
  HttpDownloadOptions,
  HttpOptions,
  HttpResponse,
  HttpUploadOptions,
  StatefulPromise,
  Event,
  dispositionFileName,
  HttpDownloadData,
  // UploadRes,
  // LzResponse,
} from '@lanzou/core'
import fs from 'fs'
import path from 'path'
import os from 'os'

function parseJson(str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

export class Http extends HttpBase {
  request<T = any, B = any>({
    headers,
    body,
    url,
    method,
    onProgress,
  }: HttpOptions<B>): StatefulPromise<HttpResponse<T>> {
    const event = new Event()
    const promise = new Promise((resolve, reject) => {
      const reqHeaders = {...baseHeaders, cookie: common.auth.cookie, ...headers}
      if (body instanceof FormData) {
        Object.assign(reqHeaders, (body as FormData).getHeaders())
      }
      const req = https.request(url, {method, /*...options,*/ headers: reqHeaders}, res => {
        event.once('cancel', res.destroy)
        let buf = ''
        res.setEncoding('utf8')
        res.on('data', chunk => (buf += chunk))
        res.on('end', () =>
          resolve({
            json: async () => parseJson(buf),
            text: async () => buf,
            headers: res.headers,
          })
        )
        res.on('error', reject)
      })
      event.once('cancel', () => {
        typeof req.abort === 'function' ? req.abort() : req.destroy()
        reject()
      })
      if (body instanceof FormData) {
        if (typeof onProgress === 'function') {
          let bytes = 0
          ;(body as FormData).on('data', chunk => onProgress((bytes += chunk.length)))
        }
        ;(body as FormData).pipe(req)
      } else {
        if (body) req.write(typeof body === 'object' ? querystring.stringify(body as any) : body)
        req.end()
      }
    }) as StatefulPromise<HttpResponse<T>>
    promise.cancel = () => event.emit('cancel')

    return promise
  }

  download(options: HttpDownloadOptions): StatefulPromise<HttpDownloadData> {
    const event = new Event()
    const promise = new Promise((resolve, reject) => {
      https.get(options.url, {headers: {...baseHeaders, accept: 'application/octet-stream, */*; q=0.01'}}, res => {
        const size = +res.headers['content-length'] || 0
        const fileName = dispositionFileName(res.headers['content-disposition'])
        // option.onStateChange?.({state: 3, length: size, disposition: fileName})

        const downloadPath = options.path || path.join(os.tmpdir(), `${Date.now()}`)
        if (options.path) {
          fs.mkdirSync(path.dirname(options.path), {recursive: true}) // 如果有 recursive，如果目录存在都不会报错
        }
        const file = fs.createWriteStream(downloadPath)

        event.once('cancel', () => {
          res.destroy()
          file.destroy()
          reject()
        })

        // todo: 事件节流
        let len = 0
        res.on('data', chunk => options.onProgress?.((len += chunk.length), size))
        res.on('end', () => {
          file.end() // 将内存中的内容全部写入，然后关闭文件
          // option.onStateChange?.({state: 4})
          resolve({path: downloadPath, name: fileName, size})
        })
        res.on('error', () => {
          // option.onStateChange?.({state: 5})
          reject()
        })
        res.pipe(file)
      })
    }) as StatefulPromise<HttpDownloadData>
    promise.cancel = () => event.emit('cancel')

    return promise
  }

  upload(options: HttpUploadOptions): StatefulPromise<string> {
    const event = new Event()
    const promise = new Promise((resolve, reject) => {
      const fr = fs.createReadStream(options.path, options.end ? {start: options.start, end: options.end} : undefined)
      const form = new FormData()
      form.append('task', '1')
      form.append('ve', '2')
      form.append('lastModifiedDate', options.mtime.toString()) // 没有 toString 会报错
      form.append('type', 'application/octet-stream')
      form.append('id', `WU_FILE_0`)
      form.append('folder_id_bb_n', options.folderId || -1)
      form.append('size', options.size)
      form.append('name', options.name)
      form.append('upload_file', fr, options.name)

      // @ts-ignore
      const handle = this.request<LzResponse<UploadRes[]>>({
        url: `https://up.woozooo.com/fileup.php`,
        method: 'post',
        body: form,
      })
      event.once('cancel', handle.cancel)
      handle
        .then(value => value.json())
        .then(response => {
          if (response.zt == 1 && response.text?.length) console.log(response)
          resolve(response.text?.[0]?.id)
        })
        .catch(reject)
    }) as StatefulPromise<string>
    promise.cancel = () => event.emit('cancel')

    return promise
  }
}
