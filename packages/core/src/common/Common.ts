import {HttpBase} from './HttpBase'
import {FileSystemBase} from './FileSystemBase'
import {PathBase} from './PathBase'
import {AuthBase} from './AuthBase'

class Common {
  http: HttpBase
  fs: FileSystemBase
  path: PathBase
  auth: AuthBase

  set(value: Partial<Common>) {
    Object.assign(this, value)
  }
}

export const common = new Common()
