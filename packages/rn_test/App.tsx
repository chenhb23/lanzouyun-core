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

console.log(RNFetchBlob);

import {Auth} from '@lanzou/library';

console.log(new Auth());

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

const html = (url) => fetch(url).then((value) => value.text());

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
    //   lsShareUrl({
    //     url: 'https://wws.lanzous.com/b01tpeg7i',
    //     // path: 'bai.img',
    //     // pwd: 'g24j',
    //   })
    //     .then((value) => {
    //       console.log('lsShareUrl', value);
    //     })
    //     .catch((reason) => {
    //       console.log('reason', reason);
    //     });
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
