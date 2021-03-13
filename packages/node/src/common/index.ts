export * from '@lanzou/core'
export * from './FileSystem'
export * from './Http'
export * from './Path'
export * from './Auth'

import {common} from '@lanzou/core'
import {Path} from './Path'
import {FileSystem} from './FileSystem'
import {Http} from './Http'
import {Auth} from './Auth'

common.set({
  path: new Path(),
  fs: new FileSystem(),
  http: new Http(),
  auth: new Auth(),
})
