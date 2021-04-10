import {Auth, FileSystem, Http, Path} from './common'
import {common, download, getPageDownloadUrl, getRealDownloadUrl, lsShareUrl, upload, Cache} from '@lanzou/core'
import path from 'path'

// const url =
//   'https://vip.d0.baidupan.com/file/?CW9bZVtqUmMFDFRsAjddMVRrAztUQlcYBkYAWVA0ADkANVFEWkZTMAUQV0MGZVAQUz0CPl4sUWIAKVY6UHwBZQluWyJbalJ8BSpULAIsXTVUfgMgVG1XPAZtAGNQUwBoAGRRO1o0Uz4FZlcwBmRQYFM/AjNeJ1E1AHRWbVA9ATEJPls4WzZSMAVhVCQCJl0sVDMDNFQ7V2cGMAApUDwAMgAvUTZaM1MoBWJXZQY0UGZTMAIzXjdRZgA3VjJQbQFhCT5bbVtgUmcFMVQ3Am5daFQ+A2dUPldiBjAAMVA0ADEAY1EwWmFTPwV9V3sGO1AhUy8Ccl5yUTYAdVY5UGgBPQk4WztbNlI0BWNUNAJlXXpUegNvVGZXMAZnADtQPQA3ADFRM1oxUzYFZlc4BmZQYlMnAileJ1E1AGtWJ1AxATEJP1s9WzNSMAViVDYCZl1vVDsDIFR+VyUGdgA7UD0ANwAxUTJaP1MxBWtXMwZjUGhTLwJyXmhRIwA6VmJQPgEyCSdbOlszUigFYVQzAmJdclQ3AzY='
// const url =
//   'https://dev46.baidupan.com/031313bb/2021/03/04/1df794650baa7afab5840a571780c6f8.zip?st=ButrvxRu5fosCqZErf-0TA&e=1615617050&b=BR4LRlQTUAoEaVY4B2JSFFZCD2QHRQtPA2cMQFRnADtSLVloU31WOVZzAzBXYActVG0KLFEpAysGL105AnU_c&fi=39516164&pid=222-65-214-90&up='

common.set({
  auth: new Auth(),
  fs: new FileSystem(),
  http: new Http(),
  path: new Path(),
})

const file = new Cache()

setTimeout(async () => {
  // const pageUrl = await getPageDownloadUrl({url: 'https://wws.lanzous.com/ixET2nvsk6d'})
  // console.log('pageUrl', pageUrl)
  // const url = await getRealDownloadUrl(pageUrl)
  // console.log('url', url)
  // common.http.download({url}).then(value => {
  //   console.log('value', value)
  // })
  file.file('https://wws.lanzous.com/ixET2nvsk6d').then(value => {
    console.log(value)
  })
}, 1000)

// getRealDownloadUrl()
