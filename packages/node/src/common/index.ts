import {common} from 'lanzou-core'
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
