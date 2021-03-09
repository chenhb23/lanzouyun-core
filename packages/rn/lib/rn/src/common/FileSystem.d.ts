import { FileSystemBase } from '../../../core/src/common/FileSystemBase';
export declare class FileSystem extends FileSystemBase {
    constructor();
    exists(path: string): Promise<boolean>;
    mkdir(path: string, option?: {
        recursive: true;
    }): Promise<void>;
    readdir(path: string): Promise<string[]>;
    rm(path: string): Promise<void>;
    stat(path: string): Promise<{
        isFile: boolean;
        isDirectory: boolean;
        size: number;
        mtime: Date;
    }>;
    writeFile(option: {
        source: string;
        target: string;
        start?: number;
        end?: number;
        flags?: 'w' | 'a';
    }): Promise<void>;
}
