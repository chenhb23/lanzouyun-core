export interface PageOptions {
    /**
     * 分享页面的 url
     */
    url: string;
    /**
     * 如果传入 html，则跳过页面的解析过程
     */
    html?: string;
    /**
     * 密码
     */
    pwd?: string;
}
/**
 * 页面的下载链接（还不是 nginx 的真实下载链接）
 */
export declare function getPageDownloadUrl(option: PageOptions): Promise<string>;
/**
 * 需要设置 header accept: application/octet-stream
 */
export declare function getRealDownloadUrl(pageDownloadUrl: string): Promise<string>;
export interface DownloadOption {
    url: string;
    /**
     * 保存的路径
     */
    path: string;
    pwd?: string;
    onStateChange?: (value: {
        state: 1 | 2;
        url: string;
    } | {
        state: 3;
        length: number;
        disposition: string;
    } | {
        state: 4;
    } | {
        state: 5;
    } | {
        state: 6;
    }) => void;
    /**
     * 进度回调
     */
    onProgress?: (resolve: number, total: number) => void;
}
/**
 * @example
 * ```
 const handle = download({
   url,
   path: 'src/assets/test.png',
   onProgress: (resolve, total) => {
     console.log(`${resolve} / ${total}`)
   },
 })
 setTimeout(() => handle.cancel(), 1000)
 await handle.promise
 * ```
 * @param option
 */
export declare function download(option: DownloadOption): {
    cancel(): void;
    promise: Promise<void>;
};
