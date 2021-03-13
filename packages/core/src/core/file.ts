import {common} from '../common/Common'
import {Storage} from './storage'

export class File {
  private readonly storage: Storage

  constructor() {
    this.storage = new Storage('file.json')
  }

  async fetch(url: string, expire = 10 * 1000) {
    const getImg = async (url: string): Promise<string> => {
      // common.http.download({url, path: common.fs.getCacheDir()})
      // todo: download
      const path = common.path.join(common.fs.getCacheDir(), `${Math.random()}.png`)
      const data = {
        path,
        name: path,
        expire: expire ? Date.now() + expire : null,
      }
      this.storage.setItem(url, JSON.stringify(data))
      await common.fs.writeFile(path, JSON.stringify(data))
      return data.path
    }

    const item = this.storage.getItem(url)
    if (item) {
      const json: {path: string; name: string; expire: number} = JSON.parse(item)
      if (json.expire && Date.now() > json.expire) return getImg(url)

      const exists = await common.fs.exists(json.path)
      if (exists) return json.path
      else return getImg(url)
    } else return getImg(url)
  }
}
