import {login} from './core/auth'
import {upload} from './core/upload'

login().then(() => {
  upload({path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png'})
})
