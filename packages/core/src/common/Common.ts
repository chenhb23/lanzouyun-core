import {HttpBase} from './HttpBase'
import {FileSystemBase} from './FileSystemBase'
import {PathBase} from './PathBase'
import {AuthBase} from './AuthBase'
import {Event, EventFn} from '../util/Event'

export class Common extends Event {
  http: HttpBase
  fs: FileSystemBase
  path: PathBase
  auth: AuthBase

  private isInit = false

  set(value: Partial<Common>) {
    Object.assign(this, value)
    if (this.http && this.fs && this.path && this.auth && !this.isInit) {
      this.isInit = true
      this.emit('init')
    }
  }

  emit(event: 'init', ...args)
  emit(event: string, ...args) {
    super.emit(event, ...args)
  }

  once(event: 'init', fn: EventFn)
  once(event: string, fn: EventFn) {
    super.once(event, fn)
  }

  on(event: 'init', fn: EventFn)
  on(event: string, fn: EventFn) {
    if (this.isInit) fn()
    else super.once(event, fn)
  }
}

export const common = new Common()
