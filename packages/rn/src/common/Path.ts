import {common, PathBase} from '@lanzou/core'
import RNFetchBlob from 'rn-fetch-blob'

export class Path extends PathBase {
  constructor() {
    super()
    this.sep = '/'
  }

  sep: string

  /**
   * 把路径变为绝对路径，只允许一个参数
   */
  resolve(p: string) {
    return RNFetchBlob.fs.stat(p).then(value => value.path)
  }
}

common.set({path: new Path()})
