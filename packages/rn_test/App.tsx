/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  // Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNFetchBlob from 'rn-fetch-blob';
import {match} from './util';
import querystring from 'querystring';

// console.log(require('lanzou-core'));
// import('../core/src/config').then((value) => {
//   console.log('value', value);
// });

// import {Auth} from './rn/Auth';
// import {FileSystem} from './rn/FileSystem';
// import {Http} from './rn/Http';
// import {Path} from './rn/Path';
// import {lsShareUrl, common} from '@lanzou/core';
// import {Auth} from 'rn/src/common/Auth';
// import {FileSystem} from 'rn/src/common/FileSystem';
// import {Http} from 'rn/src/common/Http';
// import {Path} from 'rn/src/common/Path';
// import {Auth, FileSystem, Http, Path} from '../rn';
// import {lsShareUrl, common} from '../core/src';
// import {lsShareUrl, common} from 'core';
import {testLibrary} from 'library';
// common.set({
//   auth: new Auth(),
//   fs: new FileSystem(),
//   http: new Http(),
//   path: new Path(),
// });
//
// console.log('common', common.auth);

// RNFetchBlob.fs.slice();

// RNFetchBlob.fs.ls('/').then((value) => console.log(value));
// RNFetchBlob.fetch();
// RNFetchBlob.fs.stat('/').then((value) => {
//   console.log(value);
// });
// console.log(RNFetchBlob.fs.dirs);

// RNFetchBlob.fetch().progress();

console.log(RNFetchBlob.fs.dirs);

// RNFetchBlob.fs
//   .ls(
//     // Platform.OS === 'ios'
//     //   ? RNFetchBlob.fs.dirs.CacheDir +
//     //       '/org.reactjs.native.example.pin-app/Cache.db'
//     //   : RNFetchBlob.fs.dirs.CacheDir,
//     '.',
//   )
//   .then((value) => {
//     console.log('ls', value);
//     // RNFetchBlob.fs.dirs
//     // RNFetchBlob.fs.readStream();
//   });

// RNFetchBlob.fs.slice();

// RNFetchBlob.fs.as

// RNFetchBlob.fs
//   .stat(
//     RNFetchBlob.fs.dirs.CacheDir +
//       '/org.reactjs.native.example.pin-app/Cache.db',
//   )
//   .then((value) => {
//     console.log('stat', value);
//   });

const html = (url) => fetch(url).then((value) => value.text());

// function parseUrl(url) {
//   const uri = new URL(url);
//   return {
//     origin: uri.origin,
//     id: uri.pathname.replace(/^\//, ''),
//   };
// }

function getRealDownloadUrl(pageDownloadUrl) {
  return fetch(pageDownloadUrl, {
    method: 'GET',
    headers: {
      accept: 'application/octet-stream, */*; q=0.01',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept-language': 'zh-CN,zh;q=0.9',
      pragma: 'no-cache',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
    },
  }).then((value) => {
    // console.log(value.headers);
    // console.log(value);
    return value.url;
  });
}

const App = () => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    // console.log()
    testLibrary();
    // lsShareUrl({
    //   url: 'https://wws.lanzous.com/b01tpeg7i',
    //   // path: 'bai.img',
    //   // pwd: 'g24j',
    // })
    //   .then((value) => {
    //     console.log('lsShareUrl', value);
    //   })
    //   .catch((reason) => {
    //     console.log('reason', reason);
    //   });
  });

  const test = async () => {
    // RNFetchBlob.fetch('post', )
    const url = 'https://wws.lanzous.com/iGUlnmklw7c';
    const origin = 'https://wws.lanzous.com';
    // console.log('origin', origin);
    const shareHTML = await html(url);
    const iframe = match.iframe(shareHTML);

    const iframeUrl = `${origin}${iframe}`;

    const downHTML = await html(iframeUrl);
    // console.log(downHTML);
    const sign = match.sign(downHTML);
    const signs = match.signs(downHTML);
    const websign = match.websign(downHTML);
    const ves = match.ves(downHTML);

    // fetch('', {
    //   body: ''
    // })

    const res = await RNFetchBlob.fetch(
      'POST',
      `${origin}/ajaxm.php`,
      {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'accept-language': 'zh-CN,zh;q=0.9',
        pragma: 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        referer: iframeUrl,
      },
      querystring.stringify({
        action: 'downprocess',
        signs,
        sign,
        ves,
        websign,
      }),
      // querystring.stringify({
      //   action: 'downprocess',
      //   signs,
      //   sign,
      //   ves,
      //   websign,
      // }),
    );
    const response = JSON.parse(res.data);
    // console.log(typeof response);
    // console.log(response);
    const downloadUrl = `${response.dom}/file/${response.url}`;
    const downUrl = await getRealDownloadUrl(downloadUrl);
    setImgUrl(downUrl);
    console.log(downloadUrl);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/*<Header />*/}
          {/*{global.HermesInternal == null ? null : (*/}
          {/*  <View style={styles.engine}>*/}
          {/*    <Text style={styles.footer}>Engine: Hermes</Text>*/}
          {/*  </View>*/}
          {/*)}*/}
          <Button onPress={test} title={'test'} />
          <View
            style={{
              width: 200,
              height: 200,
              // , backgroundColor: 'red'
            }}>
            {!!imgUrl && (
              <Image
                source={{uri: imgUrl}}
                style={{width: '100%', height: '100%'}}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

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
});

export default App;
