import child_process from 'child_process'
import readline from 'readline'
import fs from 'fs'

const lzy = 'https://www.lanzou.com'

const authFile = '.lanzou_auth'

export let cookie = fs.existsSync(authFile) ? fs.readFileSync(authFile).toString() : ''

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

/**
 * 返回 cookie
 * todo: 如果入参不为空，则不打开浏览器，直接设置 cookie
 */
export function login(userCookie?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // if (userCookie) {
    //   if (setCookie(userCookie)) {
    //     return resolve(userCookie)
    //   }
    // }

    if (!cookie) {
      open(lzy)
      console.log('登录后请将 cookie 复制到这里:')
      const rl = readline.createInterface({input: process.stdin, output: process.stdout})
      rl.on('line', input => {
        rl.close()
        if (setCookie(input)) {
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

export function setCookie(value: string) {
  if (!value) {
    console.log('cookie 为空！')
    return false
  }
  cookie = value
  fs.writeFileSync(authFile, value)
  console.log('cookie 设置完成')
  return true
}

export function logout() {
  cookie = ''
  if (fs.existsSync(authFile)) fs.unlinkSync(authFile)
  console.log('已登出')
}
