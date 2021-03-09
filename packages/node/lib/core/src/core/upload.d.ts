export interface UploadOption {
    path: string;
    folderId?: string;
    onStateChange?: () => void;
    onProgress?: (value: {
        resolveBytes: number;
        totalBytes: number;
        currentResolveBytes: number;
        currentTotalBytes: number;
        name: string;
        current: number;
        length: number;
    }) => void;
}
/**
 * 上传文件或文件夹
 */
export declare function upload(option: UploadOption): Promise<void>;
/**
 * @example
 ```
  login().then(() => {
    uploadFile({path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png'})
  })
 ```
 */
export declare function uploadFile(option: UploadOption): Promise<void>;
