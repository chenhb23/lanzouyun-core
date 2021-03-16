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

import {DB, registry} from 'gitee-db'
import Video from 'react-native-video'

registry({
  access_token: '21e8f219106aae2ad7d5ecde9f2dfecf',
  owner: 'leleleyu',
  repo: 'lanzou',
})

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
  Cache,
  getRealDownloadUrl,
  baseHeaders,
  PersistGate,
  // file,
} from '@lanzou/rn'

// common.set({
//   auth: new Auth(),
//   fs: new FileSystem(),
//   http: new Http(),
//   path: new Path(),
// })

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

const cache = new Cache()

const App = () => {
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    // setTimeout(async () => {
    //   // const pageUrl = await getPageDownloadUrl({url: 'https://wws.lanzous.com/izUmEmhxu7e'})
    //   // console.log('pageUrl', pageUrl)
    //   // const url = await getRealDownloadUrl(pageUrl)
    //   // console.log('url', url)
    //   // const res = await common.http.download({
    //   //   url: url,
    //   // })
    //   // console.log('res', res)
    //   file.fetch('https://wws.lanzous.com/izUmEmhxu7e', 100 * 1000).then(value => {
    //     console.log('value', value)
    //     setImgUrl(value.path)
    //   })
    // }, 1000)
    // http://vjs.zencdn.net/v/oceans.mp4

    const videoUrl = 'https://wws.lanzous.com/ijhdFmzhcfg'

    // cache.file('https://wws.lanzous.com/izUmEmhxu7e').then(async value => {
    cache.file(videoUrl).then(async value => {
      console.log(value)
      // setImgUrl(value.path)
      if (!(await common.fs.exists(value.path + '.mp4'))) {
        await common.fs.copy({
          source: value.path,
          target: value.path + '.mp4',
        })
        common.fs.rm(value.path)
      }

      setImgUrl('file://' + value.path + '.mp4')
      // const db = new DB()
      // const table = await db.table('img')
      // const data = await table.where<typeof value>(value1 => value1.body.name === value.name).findOne()
      // if (!data) {
      //   const ins = await table.insert(value)
      //   console.log('insert', ins)
      // } else {
      //   const upd = await table.update(data.id, value)
      //   console.log('update', upd)
      // }
    })

    // cache.url('https://wws.lanzous.com/ijhdFmzhcfg').then(value => {
    //   console.log('value', value)
    //   setImgUrl(value.url)
    // })
  }, [])

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

  // 监听 common 的 onReady

  return (
    <PersistGate>
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
            {/*{!!imgUrl && <Image source={{uri: imgUrl}} style={{width: '100%', height: '100%'}} />}*/}
          </View>
        </ScrollView>
      </SafeAreaView>
      {!!imgUrl && (
        <Video
          source={{uri: imgUrl}}
          // src={imgUrl}
          style={{...StyleSheet.absoluteFillObject}}
        />
      )}
    </PersistGate>
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
