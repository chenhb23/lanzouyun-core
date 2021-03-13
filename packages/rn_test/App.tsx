/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  // Text,
  StatusBar,
  Button,
  Image,
} from 'react-native'

import {Colors} from 'react-native/Libraries/NewAppScreen'
import RNFetchBlob from 'rn-fetch-blob'
import {match} from './util'
import querystring from 'querystring'

import {
  Auth,
  FileSystem,
  Http,
  Path,
  common,
  lsShareUrl,
  upload,
  getPageDownloadUrl,
  // getRealDownloadUrl,
  download,
  Storage,
  File,
  getRealDownloadUrl,
} from '@lanzou/rn'
common.set({
  auth: new Auth(),
  fs: new FileSystem(),
  http: new Http(),
  path: new Path(),
})

class Container {
  cache = {}

  get<T>(con: {new (): T}): T {
    if (!this.cache[con.name]) {
      this.cache[con.name] = new con()
    }

    return this.cache[con.name]
  }
}

const con = new Container()

// const a = con.get(FileSystem)
//
// const b = con.get(FileSystem)

// console.log('a === b', a === b)

// const storage = new Storage('db.json')

// RNFetchBlob.fs.unlink('aaa.json').then(value => {
//   console.log('finish', value)
// })

// RNFetchBlob.fetch('get', 'https://leleleyu.gitee.io/lanzou/auth.json', {
//   accept:
//     'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//   'accept-language': 'zh-CN,zh;q=0.9',
//   'cache-control': 'no-cache',
//   pragma: 'no-cache',
//   'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
//   'sec-ch-ua-mobile': '?0',
//   'sec-fetch-dest': 'document',
//   'sec-fetch-mode': 'navigate',
//   'sec-fetch-site': 'none',
//   'sec-fetch-user': '?1',
//   'upgrade-insecure-requests': '1',
// }).then(value => {
//   console.log(value)
// })

// fetch('https://leleleyu.gitee.io/lanzou/auth.json')
//   .then(value => value.text())
//   .then(value => console.log(value))

// fetch('https://leleleyu.gitee.io/lanzou/auth.json', {
//   headers: {
//     accept:
//       'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//     'accept-language': 'zh-CN,zh;q=0.9',
//     'cache-control': 'no-cache',
//     pragma: 'no-cache',
//     'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-fetch-dest': 'document',
//     'sec-fetch-mode': 'navigate',
//     'sec-fetch-site': 'none',
//     'sec-fetch-user': '?1',
//     'upgrade-insecure-requests': '1',
//     'user-agent':
//       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
//   },
//   referrerPolicy: 'strict-origin-when-cross-origin',
//   body: null,
//   method: 'GET',
//   mode: 'cors',
//   credentials: 'include',
// })
//   .then(value => value.text())
//   .then(console.log)

// global.common = common
//
// const a = eval(`console.log(global.common)`)
// console.log('a', a)

// console.log(require('@lanzou/core'));
// common.set({
//   auth: new Auth(),
//   fs: new FileSystem(),
//   http: new Http(),
//   path: new Path(),
// });
// Object.assign(common, {
//   auth: new Auth(),
//   fs: new FileSystem(),
//   http: new Http(),
//   path: new Path(),
// });

// const html = url => fetch(url).then(value => value.text())
//
// function getRealDownloadUrl(pageDownloadUrl) {
//   return fetch(pageDownloadUrl, {
//     method: 'GET',
//     headers: {
//       accept: '*/*; q=0.01',
//       'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//       'accept-language': 'zh-CN,zh;q=0.9',
//       pragma: 'no-cache',
//       'sec-fetch-dest': 'empty',
//       'sec-fetch-mode': 'cors',
//       'sec-fetch-site': 'same-origin',
//     },
//   }).then(value => {
//     // console.log(value.headers);
//     console.log(value)
//     return value.url
//   })
// }
// function getRealDownloadUrl(pageDownloadUrl: string) {
//   return RNFetchBlob.config({fileCache: true})
//     .fetch('GET', pageDownloadUrl, {
//       accept: '*/*; q=0.01',
//       'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//       'accept-language': 'zh-CN,zh;q=0.9',
//       pragma: 'no-cache',
//       'sec-fetch-dest': 'empty',
//       'sec-fetch-mode': 'cors',
//       'sec-fetch-site': 'same-origin',
//     })
//     .then(value => {
//       console.log('valueaa', value.path())
//       return value.path()
//     })
// }

// RNFetchBlob.config()
// const file = new File()

const App = () => {
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    // lsShareUrl({
    //   url: 'https://wws.lanzous.com/b01tpeg7i',
    //   url: 'https://wws.lanzous.com/izUmEmhxu7e',
    //   // path: 'bai.img',
    //   // pwd: 'g24j',
    // })
    //   .then((value) => {
    //     console.log(value.list);
    //   })
    //   .catch((reason) => {
    //     console.log('reason', reason);
    //   });
    // const dir = RNFetchBlob.fs.dirs.CacheDir + '/lanzou.txt';
    // RNFetchBlob.fs.createFile(dir, '文本文件', 'utf8');
    // RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.CacheDir).then((value) => {
    //   console.log(value);
    // });
    // upload({
    //   path: dir,
    //   onProgress: (value) => {
    //     console.log(value);
    //   },
    // }).then((value) => console.log(value));

    // storage.getItem('ab').then(value => {
    //   console.log('vallue', value)
    // })
    setTimeout(async () => {
      // console.log("storage.getItem('list')", storage.getItem('list'))
      // storage.setItem('list', JSON.stringify(['a', 'b', 'c3', 3]))
      // storage.clear()
      // file.fetch('http://www.baidu.com/zxxxxx1').then(value => {
      //   console.log('fetch4', value)
      // })
      // const pageUrl = await getPageDownloadUrl({url: 'https://wws.lanzous.com/izUmEmhxu7e'})
      // console.log('pageUrl', pageUrl)
      // common.http.download({
      //   url: pageUrl,
      // })
    }, 1000)

    // storage.saveData('ab', 'abbb').then(() => {
    //   console.log('save finish')
    // })

    // down.saveFile()
    // console.log('down.cache4', storage.cache)
    // down.saveFile({test: 'abc'})
    // setTimeout(async () => {
    //   // await down.saveFile({test2: 'aaaaaaa'})
    //   console.log('finish2')
    // }, 1000)
  })

  const test = async () => {
    // const url = 'https://wws.lanzous.com/iZ8Irmh59eh'
    // // const url = 'https://wws.lanzous.com/iIsdEmg3iti'
    // const downUrl = await getPageDownloadUrl({url})
    // console.log(downUrl)
    // const realUrl = await getRealDownloadUrl(downUrl)
    // console.log('downUrl', realUrl)
    // // download()
    // setImgUrl(`file://${realUrl}`)
    // // setImgUrl(realUrl)
  }

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
          <Button onPress={test} title={'test'} />
          <View
            style={{
              width: 200,
              height: 200,
            }}
          >
            {!!imgUrl && <Image source={{uri: imgUrl}} style={{width: '100%', height: '100%'}} />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

export default App
