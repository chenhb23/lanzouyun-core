import {common} from '../common/Common'
import {Storage} from './storage'
import {download, getPageDownloadUrl, getRealDownloadUrl} from './download'
import {HttpDownloadData} from '../common'

export class Cache {
  private readonly storage: Storage

  constructor() {
    this.storage = new Storage('file.json')
  }

  /**
   * 缓存文件默认有效期1天
   */
  async file(url: string, expire = 1000 * 60 * 60 * 24): Promise<HttpDownloadData> {
    await this.storage.waitForReady()
    const key = `file:${url}`

    const getFile = async (): Promise<HttpDownloadData> => {
      const response = await download({url})
      const data: HttpDownloadData & {expire: number} = {
        path: response.path,
        name: response.name,
        size: response.size,
        expire: expire ? Date.now() + expire : null,
      }
      this.storage.setItem(key, JSON.stringify(data))
      return data
    }

    const item = this.storage.getItem(key)
    if (item) {
      const json: HttpDownloadData & {expire: number} = JSON.parse(item)
      const exists = await common.fs.exists(json.path)
      if (json.expire && Date.now() > json.expire) {
        return getFile().then(value => {
          // 新文件下载完成后再删除过期文件
          if (exists) common.fs.rm(json.path)
          return value
        })
      }

      if (exists) return json
    }
    return getFile()
  }

  /**
   * 返回直链，有效期1小时
   */
  async url(url: string, expire = 1000 * 60 * 15): Promise<{url: string}> {
    await this.storage.waitForReady()
    const key = `link:${url}`
    const getLink = async () => {
      const pageUrl = await getPageDownloadUrl({url})
      const realUrl = await getRealDownloadUrl(pageUrl)
      const data = {url: realUrl, expire: expire ? Date.now() + expire : null}

      this.storage.setItem(key, JSON.stringify(data))
      return data
    }

    const item = this.storage.getItem(key)
    if (item) {
      const json: {url: string} & {expire: number} = JSON.parse(item)
      if (!json.expire || Date.now() < json.expire) {
        return json
      }
    }
    return getLink()
  }
}
