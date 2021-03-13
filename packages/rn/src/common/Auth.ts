import {AuthBase, common} from '@lanzou/core'
import RNFetchBlob from 'rn-fetch-blob'

const authFile = '.lanzou_auth'
const tempCookie =
  'UM_distinctid=175c95f41fd754-0cc79e716268d2-326f7907-280000-175c95f41fedcb; ylogin=1702063; folder_id_c=-1; phpdisk_info=BzJfagdlAT8OPANlC2IEVwBkBA9ZMQZpV2xQMVdmAzlRZldmDWtRbwE6BF0NY1duBmZWYw9gBzVVYgNkAz0DZQdgX2QHYgFsDjgDYwtoBDgAZwQ0WTgGYFdiUDdXNwNiUTRXZg1oUT4BOwQxDV5XPAZuVmwPZwdnVW4DYAM2AzUHMV9k; CNZZDATA1253610886=257397820-1605400618-https%253A%252F%252Fup.woozooo.com%252F%7C1615186052'

export class Auth extends AuthBase {
  constructor() {
    super()
    this.cookie = tempCookie
  }

  cookie: string

  login(cookie: string): Promise<string> {
    this.setCookie(cookie)
    return Promise.resolve(cookie)
  }

  logout(): Promise<void> {
    this.removeCookie()
    return Promise.resolve(undefined)
  }

  removeCookie(): void {
    this.cookie = ''
    RNFetchBlob.fs.unlink(authFile)
  }

  setCookie(cookie: string): boolean {
    this.cookie = cookie
    RNFetchBlob.fs.writeFile(authFile, cookie, 'utf8')
    return true
  }
}

common.set({auth: new Auth()})
