import {FileSystemBase} from '@lanzou/core'
import fs from 'fs'
import {promisify} from 'util'
import * as os from 'os'
import path from 'path'

export class FileSystem extends FileSystemBase {
  getCacheDir(): string {
    return os.tmpdir()
  }

  getDocumentDir(): string {
    return path.resolve('.')
  }

  exists(path: string): Promise<boolean> {
    return Promise.resolve(fs.existsSync(path))
  }

  mkdir(path: string, option?: {recursive: true}): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, option, err => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  async rm(path: string): Promise<void> {
    if (await this.exists(path)) {
      return promisify(fs.unlink)(path)
    }
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

  copy(option: {source: string; target: string; start?: number; end?: number; flags?: 'w' | 'a'}): Promise<void> {
    return new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(option.target, {flags: option.flags || 'w'})
      const rs = fs.createReadStream(option.source, option.end ? {start: option.start, end: option.end} : undefined)
      ws.on('close', resolve)
      ws.on('error', reject)
      rs.on('error', reject)
      rs.pipe(ws)
    })
  }

  async writeFile(p: string, data: string): Promise<void> {
    if (!(await this.exists(path.dirname(p)))) {
      await this.mkdir(p, {recursive: true})
    }
    return promisify(fs.writeFile)(p, data)
  }

  readFile(path: string): Promise<any> {
    return promisify(fs.readFile)(path).then(value => value.toString())
  }
}
