import {Event, EventFn} from '../util/Event'
import {common} from '../common/Common'

export class Storage extends Event {
  private filePath: string
  private data: {[key: string]: string} = {}

  /**
   * 数据恢复后改值变为 true
   */
  public isReady = false

  constructor(filePath?: string) {
    super()
    common.once('init', () => this.init(filePath))
  }

  private async init(filePath = common.path.join(common.fs.getDocumentDir(), 'db.json')) {
    if (this.isReady) return
    this.filePath = ['/users/', '/data/', '/private/'].some(value => filePath.toLowerCase().startsWith(value))
      ? filePath
      : common.path.join(common.fs.getDocumentDir(), filePath)

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

  async clear() {
    this.data = {}
    await this.waitForReady()
    return common.fs.rm(this.filePath)
  }

  readFile(path: string) {
    return common.fs.readFile(path)
  }

  async writeFile(path: string, data: string) {
    await this.waitForReady()
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

  /**
   * 等待数据恢复
   */
  waitForReady() {
    return new Promise<void>(resolve => {
      this.on('ready', resolve)
    })
  }

  // 只能调用 super, 调用 this 会 max call stack
  emit(event: 'ready', ...args)
  emit(event: string, ...args) {
    super.emit(event, ...args)
  }

  on(event: 'ready', fn: EventFn)
  on(event: string, fn: EventFn) {
    if (this.isReady) fn()
    else super.on(event, fn, true)
  }

  once(event: 'ready', fn: EventFn)
  once(event: string, fn: EventFn) {
    super.once(event, fn)
  }
}
