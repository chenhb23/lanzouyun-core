import './common'
import {common, download, lsShareUrl, upload} from 'lanzou-core'
import path from 'path'

// lsShareUrl({
//   url: 'https://wws.lanzous.com/b01tpeg7i',
//   // path: 'bai.img',
//   // pwd: 'g24j',
// }).then(value => {
//   console.log(value)
// })

common.auth.setCookie(
  'UM_distinctid=175c95f41fd754-0cc79e716268d2-326f7907-280000-175c95f41fedcb; ylogin=1702063; _uab_collina=161483959881027039336908; folder_id_c=-1; phpdisk_info=BDFQZQRmUW9UZgJkWzJSAQVhV1xdNQBvV2xTMgIzCzFXYAQ1VzFSbAE6UAlaNFRtB2cGMwxjVGZSZVUyAjwAZgRjUGsEYVE8VGICYls4Um4FYldnXTwAZldiUzQCYgtqVzIENVcyUj0BO1BlWglUPwdvBjwMZFQ0UmlVNgI3ADYEMlBr; CNZZDATA1253610886=1166807045-1614868956-https%253A%252F%252Fpc.woozooo.com%252F%7C1615167207'
)

// upload({
//   path: '4.0.0.zip',
// }).then(value => {
//   console.log('value', value)
// })

// console.log(path.basename('/usr/local/test.txt', '.tsxt'))
