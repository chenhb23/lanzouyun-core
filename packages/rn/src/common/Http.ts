import {
  baseHeaders,
  common,
  HttpBase,
  HttpDownloadOptions,
  HttpOptions,
  HttpResponse,
  HttpUploadOptions,
  StatefulPromise,
  Event,
  stringify,
  dispositionFileName,
} from '@lanzou/core'
import RNFetchBlob from 'rn-fetch-blob'

export class Http extends HttpBase {
  request<T = any, B = any>(options: HttpOptions<B>): StatefulPromise<HttpResponse<T>> {
    const event = new Event()
    const promise = new Promise<HttpResponse<T>>((resolve, reject) => {
      const handle = RNFetchBlob.fetch(
        options.method,
        options.url,
        {...baseHeaders, cookie: common.auth.cookie, ...options.headers},
        typeof options.body === 'object' ? stringify(options.body) : options.body
      )
      event.once('cancel', () => {
        handle.cancel()
        reject()
      })
      handle
        .then(value => {
          resolve({
            json: async () => value.json(),
            text: async () => value.text(),
            headers: {
              ...value.respInfo.headers,
              location:
                value.respInfo.headers.location ?? value.respInfo.redirects?.[value.respInfo.redirects.length - 1],
            },
          })
        })
        .catch(reject)
    }) as StatefulPromise<HttpResponse<T>>
    promise.cancel = () => event.emit('cancel')

    return promise
  }

  download(options: HttpDownloadOptions): StatefulPromise<{name: string; path: string}> {
    const event = new Event()

    const promise = new Promise(async (resolve, reject) => {
      if (options.path) {
        const exists = await RNFetchBlob.fs.exists(options.path)
        if (!exists) await RNFetchBlob.fs.mkdir(options.path)
      }
      const handle = RNFetchBlob.config(options.path ? {fileCache: true, path: options.path} : {fileCache: true}).fetch(
        'get',
        options.url
      )
      event.once('cancel', () => {
        handle.cancel()
        reject()
      })
      if (typeof options.onProgress === 'function') {
        handle.progress(options.onProgress)
      }
      const value = await handle
      console.log(value)
      resolve({
        path: options.path ?? value.path(),
        name: '',
        // name: dispositionFileName(value.respInfo.headers),
      })

      // handle
      //   .then(value => {
      //
      //     resolve({
      //       path: value.path(),
      //       // name: dispositionFileName(value.respInfo.headers),
      //     })
      //   })
      //   .catch(reject)

      // RNFetchBlob.fs
      //   .exists(options.path)
      //   .then(exists => {
      //     if (!exists) return RNFetchBlob.fs.mkdir(options.path)
      //   })
      //   .then(() => {
      //     const handle = RNFetchBlob.config({
      //       fileCache: true,
      //       path: options.path,
      //     }).fetch('get', options.url)
      //     event.once('cancel', () => {
      //       handle.cancel()
      //       reject()
      //     })
      //     if (typeof options.onProgress === 'function') {
      //       handle.progress(options.onProgress)
      //     }
      //     handle
      //       .then(value => {
      //
      //         resolve({
      //           path: value.path(),
      //           // name: dispositionFileName(value.respInfo.headers),
      //         })
      //       })
      //       .catch(reject)
      //   });
    }) as StatefulPromise<{name: string; path: string}>
    promise.cancel = () => event.emit('cancel')
    return promise
  }

  upload(options: HttpUploadOptions): StatefulPromise<any> {
    const event = new Event()
    const promise = new Promise((resolve, reject) => {
      const handle = RNFetchBlob.fetch(
        'post',
        'https://up.woozooo.com/fileup.php',
        {
          ...baseHeaders,
          cookie: common.auth.cookie,
          'Content-Type': 'multipart/form-data',
        },
        [
          {name: 'task', data: '1'},
          {name: 've', data: '2'},
          {name: 'lastModifiedDate', data: options.mtime.toString()},
          {name: 'type', data: 'application/octet-stream'},
          {name: 'id', data: 'WU_FILE_0'},
          {name: 'folder_id_bb_n', data: options.folderId || -1},
          {name: 'size', data: options.size},
          {name: 'name', data: options.name},
          {name: 'upload_file', filename: options.name, data: RNFetchBlob.wrap(options.path)},
        ]
      )
      handle.then(value => {
        const response = value.json()
        if (response.zt == 1 && response.text?.length) console.log(response)
        resolve(response.text?.[0]?.id)
      })
      event.once('cancel', () => {
        handle.cancel()
        reject()
      })
    }) as StatefulPromise<any>
    promise.cancel = () => event.emit('cancel')

    return promise
  }
}
