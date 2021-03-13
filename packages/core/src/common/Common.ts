import {HttpBase} from './HttpBase'
import {FileSystemBase} from './FileSystemBase'
import {PathBase} from './PathBase'
import {AuthBase} from './AuthBase'

export class Common {
  http: HttpBase
  fs: FileSystemBase
  path: PathBase
  auth: AuthBase

  set(value: Partial<Common>) {
    Object.assign(this, value)
  }
}

export const common = new Common()
// import {HttpBase} from './HttpBase'
// import {FileSystemBase} from './FileSystemBase'
// import {PathBase} from './PathBase'
// import {AuthBase} from './AuthBase'
//
// export const common = {} as {
//   http: HttpBase
//   fs: FileSystemBase
//   path: PathBase
//   auth: AuthBase
// }

// export class Common {
//   private cache = {}
//
//   get<T>(Class: {new (...args: any[]): T}): T {
//     if (!this.cache[Class.name]) {
//       this.cache[Class.name] = new Class()
//     }
//     return this.cache[Class.name]
//   }
//
//   init<T>(Class: {new (...args: T[])}, ...options: T[]) {
//     if (!this.cache[Class.name]) {
//       this.cache[Class.name] = new Class(...options)
//     }
//   }
// }
//
// export const common = new Common()
