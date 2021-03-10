import {common} from '../common'
// import {LzResponse} from '../types/api'

export interface MkdirOption {
  parentId: string
  folderName: string
  folderDescription?: string
}

export function mkdir(option: MkdirOption): Promise<string> {
  option.folderName = option.folderName.replace(/[ ()]/g, '_')
  return common.http
    .request<LzResponse<string>>({
      url: `https://up.woozooo.com/doupload.php`,
      method: 'post',
      body: {
        task: 2,
        parent_id: option.parentId,
        folder_name: option.folderName,
        folder_description: option.folderDescription,
      },
    })
    .then(value => value.json())
    .then(response => {
      if (response.zt != 1) {
        throw new Error(response.info)
      }
      return response.text
    })
}
