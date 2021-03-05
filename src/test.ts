import {login} from './core/auth'
import {upload} from './core/upload'
import {lsFolder} from './core/ls'

login().then(() => {
  // upload({path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png'})
  lsFolder({folderId: '2554056', limit: 6}).then(value => {
    console.log('value.length', value.length)
  })
})
