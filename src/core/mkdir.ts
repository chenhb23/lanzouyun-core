import {request} from '../request'

export interface MkdirOption {
  parentId: string
  folderName: string
  folderDescription?: string
}

export function mkdir(option: MkdirOption): Promise<string> {
  option.folderName = option.folderName.replace(/[ ()]/g, '_')
  return request(`https://up.woozooo.com/doupload.php`, {
    body: {
      task: 2,
      parent_id: option.parentId,
      folder_name: option.folderName,
      folder_description: option.folderDescription,
    },
  }).then(({response}) => {
    if (response.zt != 1) {
      throw new Error(response.info)
    }
    return response.text
  })
}
