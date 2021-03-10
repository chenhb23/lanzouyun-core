import {PathBase} from '@lanzou/core'
import path from 'path'

export class Path extends PathBase {
  constructor() {
    super()
    this.sep = path.sep
  }

  sep: string

  resolve(p: string) {
    return Promise.resolve(path.resolve(p))
  }
}
