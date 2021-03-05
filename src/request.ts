import https, {RequestOptions} from 'https'
import FormData from 'form-data'
import * as querystring from 'querystring'
import {IncomingMessage} from 'http'
import {cookie} from './core/auth'

export const baseHeaders = {
  accept: 'application/json, text/javascript, */*; q=0.01',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'accept-language': 'zh-CN,zh;q=0.9',
  pragma: 'no-cache',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
}

function parseJson(str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

interface RequestExtraOptions {
  body?: Record<string, any> | FormData | string
  onData?: (bytes: number) => void
  signal?: AbortSignal
  /**
   * @default utf8
   */
  encoding?: BufferEncoding
}

interface ResponseOptions<T> extends IncomingMessage {
  response: T
}

/**
 * 请求函数，不用做下载
 * todo: cookie
 */
export function request<T = any>(
  url: string,
  {body, onData, signal, encoding, ...options} = {} as RequestOptions & RequestExtraOptions
): Promise<ResponseOptions<T>> {
  return new Promise((resolve, reject) => {
    const headers = {...baseHeaders, cookie, ...options.headers}
    if (body instanceof FormData) {
      Object.assign(headers, body.getHeaders())
    }
    const req = https.request(url, {method: 'POST', ...options, headers: headers}, res => {
      let buf = ''
      res.setEncoding(encoding)
      res.on('data', chunk => (buf += chunk))
      res.on('end', () => resolve(Object.assign(res, {response: parseJson(buf)})))
      res.on('error', reject)
    })
    if (signal) {
      signal.onabort = () => {
        req.once('abort', () => reject('request 取消'))
        typeof req.abort === 'function' ? req.abort() : req.destroy()
        // reject('request 取消')
      }
    }
    if (body instanceof FormData) {
      if (typeof onData === 'function') {
        let bytes = 0
        body.on('data', chunk => onData((bytes += chunk.length)))
      }
      body.pipe(req)
    } else {
      if (body) req.write(typeof body === 'object' ? querystring.stringify(body) : body)
      req.end()
    }
  })
}
