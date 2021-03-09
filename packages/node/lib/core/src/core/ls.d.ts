export interface LsShareOption {
    url: string;
    pwd?: string;
    /**
     * 限制最大页数，默认不限制
     */
    limit?: number;
}
export interface FileList extends UrlFile {
    html?: string;
    list: UrlFile[];
}
export interface UrlFile {
    name: string;
    id: string;
    url: string;
    size: string;
    pwd?: string;
    type?: 'file' | 'directory';
}
/**
 * 列出分享文件
 */
export declare function lsShareUrl(option: LsShareOption): Promise<FileList>;
export interface FolderDir {
    type: 'directory';
    folderId: string;
    description: string;
    name: string;
    pwd: string;
    url: string;
    id: string;
}
export interface FolderFile {
    type: 'file';
    fileId: string;
    name: string;
    pwd: string;
    url: string;
    id: string;
    downs: string;
    size: string;
    time: string;
}
export declare function lsDir(folderId: string): Promise<FolderDir[]>;
export declare function lsFile(folderId: string, limit: number): Promise<FolderFile[]>;
export interface LsFolderOption {
    folderId?: string;
    limit?: number;
}
/**
 * 列出文件夹下的 文件夹和文件
 * @example
 ```
 await lsFolder({folderId, limit: 1})
 ```
 */
export declare function lsFolder(option: LsFolderOption): Promise<(FolderDir | FolderFile)[]>;
