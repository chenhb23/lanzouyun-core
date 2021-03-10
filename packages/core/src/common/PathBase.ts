/**
 * path need full path
 */
export abstract class PathBase {
  sep: string

  abstract resolve(p: string): Promise<string>

  join(...paths: string[]): string {
    return paths.map((value, index) => (index === 0 ? value : value.replace(/^\.\//, ''))).join(this.sep)
  }

  basename(p: string, ext?: string): string {
    const arr = p.split(this.sep)
    const name = arr[arr.length - 1]
    return ext ? name.replace(new RegExp(`${ext}$`), '') : name
  }

  dirname(p: string): string {
    const index = p.lastIndexOf(this.sep)
    if (index < 0) return '.'
    return p.slice(0, index)
  }

  extname(p: string): string {
    if (!/\.\w+$/.test(p)) return ''
    const arr = p.split('.')
    return `.${arr[arr.length - 1]}`
  }
}
