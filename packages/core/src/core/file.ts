import {common} from '../common/Common'
import {Storage} from './storage'
import {download} from './download'
import {HttpDownloadData} from '../common'

export class File {
  private readonly storage: Storage

  constructor() {
    this.storage = new Storage('file.json')
  }

  /**
   * 默认有效期15分钟
   */
  async fetch(url: string, expire = 1000 * 60 * 15): Promise<HttpDownloadData> {
    await this.storage.waitForReady()
    const getImg = async (url: string): Promise<HttpDownloadData> => {
      const response = await download({url})
      const data: HttpDownloadData & {expire: number} = {
        path: response.path,
        name: response.name,
        size: response.size,
        expire: expire ? Date.now() + expire : null,
      }
      this.storage.setItem(url, JSON.stringify(data))
      return data
    }

    const item = this.storage.getItem(url)
    if (item) {
      const json: HttpDownloadData & {expire: number} = JSON.parse(item)
      const exists = await common.fs.exists(json.path)
      if (json.expire && Date.now() > json.expire) {
        return getImg(url).then(value => {
          // 新文件下载完成后再删除过期文件
          if (exists) common.fs.rm(json.path)
          return value
        })
      }

      if (exists) return json
      else return getImg(url)
    } else return getImg(url)
  }
}
