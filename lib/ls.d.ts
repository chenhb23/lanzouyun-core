export interface LsOption {
    url: string;
    pwd?: string;
    /**
     * 限制最大页数，默认不限制
     */
    limit?: number;
}
export interface FileList extends UrlFile {
    html: string;
    list: UrlFile[];
}
export interface UrlFile {
    name: string;
    id: string;
    url: string;
    size: string;
    pwd?: string;
    type?: 'file' | 'dir';
}
/**
 * 列出分享文件
 */
export declare function lsShareUrl(option: LsOption): Promise<FileList>;
