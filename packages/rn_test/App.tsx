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

// console.log(RNFetchBlob);

// import {Auth} from '@lanzou/library';
//
// console.log(new Auth());

// console.log(require('@lanzou/rn'));

// console.log(common);
// // test2();
// common.path = new Path();
// common.http = new Http();
// common.auth = new Auth();
// common.fs = new FileSystem();
// console.log('lsShareUrl', lsShareUrl);
// console.log(common.path.extname('name.txt'));

// console.log('join', new Path().join('/aaa', 'bb'));
// console.log(pathCommon.extname('abc.txt'));

// import {common, lsShareUrl} from '@lanzou/core';
// import {common} from '@lanzou/rn';
// console.log(common);

// console.log(Path);
//
// common.path = new Path();

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
} from '@lanzou/rn'
common.set({
  auth: new Auth(),
  fs: new FileSystem(),
  http: new Http(),
  path: new Path(),
})

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
function getRealDownloadUrl(pageDownloadUrl: string) {
  return RNFetchBlob.config({fileCache: true})
    .fetch('GET', pageDownloadUrl, {
      accept: '*/*; q=0.01',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept-language': 'zh-CN,zh;q=0.9',
      pragma: 'no-cache',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
    })
    .then(value => {
      console.log('valueaa', value.path())
      return value.path()
    })
}

// RNFetchBlob.config()

const App = () => {
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    // lsShareUrl({
    //   url: 'https://wws.lanzous.com/b01tpeg7i',
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
  })

  const test = async () => {
    const url = 'https://wws.lanzous.com/iZ8Irmh59eh'
    // const url = 'https://wws.lanzous.com/iIsdEmg3iti'
    const downUrl = await getPageDownloadUrl({url})
    console.log(downUrl)
    const realUrl = await getRealDownloadUrl(downUrl)
    console.log('downUrl', realUrl)
    // download()
    setImgUrl(`file://${realUrl}`)
    // setImgUrl(realUrl)
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
