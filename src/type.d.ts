interface LzResponse<T> {
  zt: number
  info: string
  text: T
}

interface PwdShareFile {
  dom: string // https://vip.d0.baidupan.com
  inf: string // DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png (4).tar
  url: string // ?UzVVaw8+BTRVXFZuAjdVOVNsVW0AG1AUADYBQlw1UxABN...
  zt: number // 1
}

interface ShareFolderFile {
  icon: string // 'tar',
  t: number // 0,
  id: string // 'i6HfKmg602b?webpage=ADFQMQFtVTUDbVEzA2AGMFU9VWQHJAY3BTsDMV0yBjQFMQVhXDAAKFQz',
  name_all: string // 'aaaaaaaa.jpg.tar',
  size: string // '47.9 K',
  time: string // '16 小时前',
  duan: string // 'img602',
  p_ico: number // 0
}

interface UploadRes {
  downs: string // "0"
  f_id: string // "izUmEmhxu7e"
  icon: string // "zip"
  id: string // "39516164"
  is_newd: string // "https://wws.lanzous.com"
  name: string // "IMG_885BA7CB7A49-1.jpeg.l..."
  name_all: string // "IMG_885BA7CB7A49-1.jpeg.lzy.zip"
  onof: string // "0"
  size: string // "1.1 M"
  time: string // "0 秒前"
}
