import { FileSystemBase } from 'lanzou-core';
export declare class FileSystem extends FileSystemBase {
    constructor();
    exists(path: any): Promise<boolean>;
    mkdir(path: any, option: any): Promise<void>;
    rm(path: any): Promise<void>;
    stat(path: string): Promise<{
        isFile: boolean;
        isDirectory: boolean;
        size: number;
        mtime: Date;
    }>;
    readdir(path: string): Promise<string[]>;
    writeFile(option: any): Promise<void>;
}
