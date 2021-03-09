import {FileSystemBase} from '../../../core/src/common/FileSystemBase'
import RNFetchBlob from 'rn-fetch-blob'

export class FileSystem extends FileSystemBase {
  constructor() {
    super()
    this.cacheDir = RNFetchBlob.fs.dirs.CacheDir
  }
  exists(path: string): Promise<boolean> {
    return RNFetchBlob.fs.exists(path)
  }

  mkdir(path: string, option?: {recursive: true}): Promise<void> {
    // rn 端默认递归创建目录
    return RNFetchBlob.fs.mkdir(path)
  }

  readdir(path: string): Promise<string[]> {
    return RNFetchBlob.fs.ls(path)
  }

  rm(path: string): Promise<void> {
    return RNFetchBlob.fs.unlink(path)
  }

  stat(path: string): Promise<{isFile: boolean; isDirectory: boolean; size: number; mtime: Date}> {
    return RNFetchBlob.fs.stat(path).then(value => ({
      isFile: value.type === 'file',
      isDirectory: value.type === 'directory',
      size: value.size,
      mtime: new Date(value.lastModified),
    }))
  }

  async writeFile(option: {source: string; target: string; start?: number; end?: number; flags?: 'w' | 'a'}) {
    if (!option.target) {
      await this.mkdir(option.target)
    }
    if (option.end) {
      await RNFetchBlob.fs.slice(option.source, option.target, option.start, option.end)
    } else {
      await RNFetchBlob.fs.cp(option.source, option.target)
    }
  }
}
