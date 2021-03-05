import {request} from '../request'

/**
 * 延时函数
 */
export const delay = (ms = 1000) => new Promise<void>(resolve => setTimeout(resolve, ms))

function matchByReg(html: string, pattern: RegExp) {
  const result = html.match(pattern)
  return result?.[1]
}

export const match = {
  iframe: (html: string) => matchByReg(html, new RegExp('<iframe[^<>]*src="([/?a-zA-Z0-9_]{9,}?)"[^<>]*>')),
  sign: (html: string) => matchByReg(html, new RegExp("'sign':'(.*?)'")),
  signs: (html: string) => matchByReg(html, new RegExp("var ajaxdata = '(.*?)';")),
  websign: (html: string) => matchByReg(html, new RegExp("'websign':'(.*?)'")),
  ves: (html: string) => matchByReg(html, new RegExp("'ves':(.*?),'")),
  t: (html: string) => {
    const varName = matchByReg(html, new RegExp("'t':(.*?),"))
    if (varName) {
      return matchByReg(html, new RegExp(`var ${varName} = '(.*?)';`))
    }
  },
  k: (html: string) => {
    const varName = matchByReg(html, new RegExp("'k':(.*?),"))
    if (varName) {
      return matchByReg(html, new RegExp(`var ${varName} = '(.*?)';`))
    }
  },
  lx: (html: string) => matchByReg(html, new RegExp("'lx':(.*?),")),
  fid: (html: string) => matchByReg(html, new RegExp("'fid':(.*?),")),
  uid: (html: string) => matchByReg(html, new RegExp("'uid':'(.*?)',")),
  rep: (html: string) => matchByReg(html, new RegExp("'rep':'(.*?)',")),
  up: (html: string) => matchByReg(html, new RegExp("'up':(.*?),")),
  ls: (html: string) => matchByReg(html, new RegExp("'ls':(.*?),")),
  // + pwd
  data: (html: string) => matchByReg(html, new RegExp("data : '(.*?)'")),
  titleWithoutPwd: (html: string) => matchByReg(html, new RegExp('0px;">(.*?)</div>')),
  title: (html: string) => matchByReg(html, new RegExp('<title>(.*?)</title>')),
  sizeWithoutPwd: (html: string) => matchByReg(html, new RegExp('文件大小：</span>(.*?)<br>')),
  sizeWithPwd: (html: string) => matchByReg(html, new RegExp('大小：(.*?)</div>')),
}

/**
 * 请求url，返回 text
 */
export function html(url: string) {
  return request<string>(url, {method: 'GET'}).then(value => value.response)
}

export function parseUrl(url: string) {
  const uri = new URL(url)
  return {
    origin: uri.origin,
    id: uri.pathname.replace(/^\//, ''),
  }
}

/**
 * 3 M -> 3096
 */
export function sizeToByte(size: string | number) {
  if (typeof size === 'string') {
    const getUnit = unit =>
      ({
        get b() {
          return 1
        },
        get k() {
          return 1024
        },
        get m() {
          return this.k * 1024
        },
        get g() {
          return this.m * 1024
        },
        get t() {
          return this.g * 1024
        },
      }[unit] || 1)
    const [_, num, unit] = size
      .toLowerCase()
      .replace(' ', '')
      .match(/^(\d+\.?\d*)([bkmgt]?)$/)

    return +num * getUnit(unit)
  }

  return size
}

/**
 * 3096 -> 3k
 */
export function byteToSize(byte: number) {
  const formatSize = (total, persize) => {
    return Math.floor((total * 100) / persize) / 100
  }

  if (byte < sizeToByte('1k')) return `0`
  if (byte < sizeToByte('1m')) return `${formatSize(byte, sizeToByte('1k'))} k`
  if (byte < sizeToByte('1g')) return `${formatSize(byte, sizeToByte('1m'))} M`
  if (byte < sizeToByte('1t')) return `${formatSize(byte, sizeToByte('1g'))} G`
}
