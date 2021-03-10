import {FileSystemBase} from '@lanzou/core'
import fs from 'fs'
import {promisify} from 'util'
import * as os from 'os'

export class FileSystem extends FileSystemBase {
  constructor() {
    super()
    this.cacheDir = os.tmpdir()
  }

  cacheDir: string

  exists(path): Promise<boolean> {
    return Promise.resolve(fs.existsSync(path))
  }

  mkdir(path, option): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, option, err => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  rm(path): Promise<void> {
    return promisify(fs.unlink)(path)
  }

  stat(path: string): Promise<{isFile: boolean; isDirectory: boolean; size: number; mtime: Date}> {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) reject(err)
        else
          resolve({
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory(),
            size: stats.size,
            mtime: stats.mtime,
          })
      })
    })
  }

  readdir(path: string): Promise<string[]> {
    return promisify(fs.readdir)(path)
  }

  writeFile(option): Promise<void> {
    return new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(option.target, {flags: option.flags || 'w'})
      const rs = fs.createReadStream(option.source, option.end ? {start: option.start, end: option.end} : undefined)
      ws.on('close', resolve)
      ws.on('error', reject)
      rs.on('error', reject)
      rs.pipe(ws)
    })
  }
}
