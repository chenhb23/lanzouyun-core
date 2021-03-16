import {DB} from 'gitee-db'
import {uploadFile} from '@lanzou/rn'

const db = new DB()

const api = {
  list: async (page = 1) => {
    const table = await db.table('list')
    return table.findMany({page})
  },
  setImg: async () => {
    const table = await db.table('list-img')
    // table
  },
  getUserInfo: async () => {},
  updateUserInfo: async () => {},
  uploadImg: async () => {},
}

// 两个页面
