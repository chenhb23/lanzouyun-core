import {common} from '../../../core/src'
import {FileSystem} from './FileSystem'
import {Http} from './Http'
import {Path} from './Path'
import {Auth} from './Auth'

common.set({
  http: new Http(),
  fs: new FileSystem(),
  path: new Path(),
  auth: new Auth(),
})

export * from '../../../core/src'
export {FileSystem} from './FileSystem'
export {Http} from './Http'
export {Path} from './Path'
export {Auth} from './Auth'
