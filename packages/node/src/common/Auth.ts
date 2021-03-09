import {AuthBase} from 'lanzou-core'
import fs from 'fs'
import readline from 'readline'
import child_process from 'child_process'

const lzy = 'https://www.lanzou.com'

const authFile = '.lanzou_auth'

function open(url: string) {
  switch (process.platform) {
    case 'win32':
      return child_process.exec(`start ${url}`)
    case 'linux':
      return child_process.exec(`xdg-open ${url}`)
    case 'darwin':
      return child_process.exec(`open ${url}`)
  }
}

export class Auth extends AuthBase {
  constructor() {
    super()
    this.cookie = fs.existsSync(authFile) ? fs.readFileSync(authFile).toString() : ''
  }

  login(cookie): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!cookie) {
        open(lzy)
        console.log('登录后请将 cookie 复制到这里:')
        const rl = readline.createInterface({input: process.stdin, output: process.stdout})
        rl.on('line', input => {
          rl.close()
          if (this.setCookie(input)) {
            resolve(input)
            console.log('登录成功')
          } else reject()
        })
        rl.on('SIGINT', () => {
          rl.close()
          reject()
        })
      } else {
        resolve(cookie)
        console.log('您已登录')
      }
    })
  }

  logout(): Promise<void> {
    this.removeCookie()
    return Promise.resolve(undefined)
  }

  removeCookie(): void {
    this.cookie = ''
    if (fs.existsSync(authFile)) fs.unlinkSync(authFile)
    console.log('已登出')
  }

  setCookie(cookie) {
    if (!cookie) return false
    this.cookie = cookie
    fs.writeFileSync(authFile, cookie)
    return true
  }
}
