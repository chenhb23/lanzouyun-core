const fetch = require('node-fetch')
const fs = require('fs')
const cheerio = require('cheerio')
const querystring = require('querystring')
const https = require('https')

// console.log('fetch', fetch)

// fetch('http://img3.laibafile.cn/p/m/203955675.jpg').then(value => {
// fetch('https://vip.d0.baidupan.com/file/?AmRXaQ8+BDVRWFBoCj9UOAA/ADgCGVQQVWNVFlQ9AUIEMFdED38DYwhrVDtWQ1J+BmhQZwVjCj0DKVIWB29QZQIzVy0PZARhUUZQPwptVBEAagBGAh5UFVUTVWRUJgFwBGpXZw98AyMIP1RwViRSNQY1UDkFPwpXA21SMAdmUGICO1cyD2UEYFEzUD8KalRzADwAdgJgVG5VYVVkVD0BNwQ1VyYPIgMnCGNUMFYyUmEGbVB6BWoKOwMrUmQHalB+AmFXYQ9kBDVRM1AzCjxUMwA5ADUCO1RgVWdVYlRpATQENFcyD2UDNAhmVGdWNFJqBm9QbAVuCm0DYVI1BzpQZwIsV3QPMwQiUSFQcwotVDAAKABsAjlUa1VjVWRUOAEyBDRXNg9hA3EIKlRrVm9SNgY6UGgFawo+AzVSYAdtUGACNlc5D2sEZFEpUCgKeFQzADYAcgJgVGZVdFUmVHgBdwQ5VzEPZANmCGpUNFYyUmoGa1BnBWwKLgNxUj0HK1BsAjBXMg9gBH5RMVAzCnBUZwBrADECc1RvVWI=', {
//     headers: {
//         referer: 'https://wws.lanzous.com/fn?CW9UPlo0VThWMgprBWFVYAFiADEEfVYgBjxVYlA6ADBUYFs6C2cPbwdkUD9TMw_c_c',
//     }
// }).then(value => {
//     // value.trailer.then(value1 => console.log('value1.keys()', value1.keys()))
//     value.
//     console.log(value.headers)
//     return value.buffer()
// }).then(buffer => {
//     // URL.createObjectURL(blob)
//     console.log('buffer', buffer.length)
//     fs.writeFileSync('test.png', buffer)
// })

/**
 * @param {string} url
 */
function html(url) {
    return fetch(url).then(value => value.text())
}

html('https://wws.lanzous.com/ixUeamcoa1e')
    .then(value => {
        // console.log(value)
        const iframe = match.iframe(value)

        html(`https://wws.lanzous.com${iframe}`)
            .then(value1 => {
                // console.log(value1)
                const sign = match.sign(value1)
                const signs = match.signs(value1)
                // const downloadUrl = ''
                const req = https.request('https://wws.lanzous.com/ajaxm.php', {
                    headers: {
                        accept: 'application/json, text/javascript, */*; q=0.01',
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'accept-language': 'zh-CN,zh;q=0.9',
                        pragma: 'no-cache',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        referer: `https://wws.lanzous.com${iframe}`
                    },
                    method: 'POST',
                }, res => {
                    // res
                    let buf = ''
                    res.on("data", chunk => (buf += chunk))
                    res.on("end", () => {
                        const res = JSON.parse(buf)
                        const url = `${res.dom}/file/${res.url}`
                        console.log(url)
                    })
                })
                req.write(querystring.stringify({
                    'action': 'downprocess',
                    'signs': signs,
                    'sign': sign,
                    'ves': 1,
                    'websign': ''
                }))
                req.end()


                /*fetch(`https://wws.lanzous.com/ajaxm.php`, {
                    method: 'post',
                    body: querystring.stringify({
                        'action': 'downprocess',
                        'signs': signs,
                        'sign': sign,
                        'ves': 1,
                        'websign': ''
                    }),
                    headers: {
                        accept: 'application/json, text/javascript, *!/!*; q=0.01',
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'accept-language': 'zh-CN,zh;q=0.9',
                        pragma: 'no-cache',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-origin',
                        referer: `https://wws.lanzous.com${iframe}`
                    }
                }).then(value2 => value2.json())
                    .then(value2 => {
                        const url = `${value2.dom}/file/${value2.url}`
                        console.log(url)
                    })*/
            })
    })

const match = {
    iframe(html) {
        const $ = cheerio.load(html)
        if ($('iframe').length) {
            return $('iframe').attr().src
        }
    },
    sign(html) {
        const result = html.match(new RegExp("'sign':'(.*?)'"))
        if (result) {
            return result[1];
        }
    },
    signs(html) {
        const result = html.match(new RegExp("var ajaxdata = '(.*?)';"))
        if (result) {
            return result[1];
        }
    }
}
