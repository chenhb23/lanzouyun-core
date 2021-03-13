import {Event} from '../util/Event'
import {common} from '../common/Common'

export class Storage extends Event {
  private readonly filePath: string
  private data: {[key: string]: string} = {}
  public isReady = false

  constructor(filePath = common.path.join(common.fs.getDocumentDir(), 'db.json')) {
    super()
    console.log('common.path', common.path)
    this.filePath = ['/users/', '/data/', '/private/'].some(value => filePath.toLowerCase().startsWith(value))
      ? filePath
      : common.path.join(common.fs.getDocumentDir(), filePath)

    this.init()
    // return Object.assign(this, p)
  }

  private async init() {
    this.data = await this.readAsJson()
    this.isReady = true
    this.emit('ready')
  }

  setItem(key: string, value: string) {
    this.data[key] = value
    this.writeFile(this.filePath, JSON.stringify(this.data))
  }

  getItem(key: string) {
    return this.data[key]
  }

  removeItem(key: string) {
    const success = delete this.data[key]
    if (success) {
      this.writeFile(this.filePath, JSON.stringify(this.data))
    }
  }

  clear() {
    this.data = {}
    common.fs.rm(this.filePath)
  }

  readFile(path: string) {
    return common.fs.readFile(path)
  }

  writeFile(path: string, data: string) {
    return common.fs.writeFile(path, data)
  }

  async readAsJson() {
    const exists = await common.fs.exists(this.filePath)
    if (!exists) return {}
    const db = await this.readFile(this.filePath)
    try {
      return JSON.parse(db)
    } catch {
      return {}
    }
  }
}
