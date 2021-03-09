export declare abstract class FileSystemBase {
    cacheDir: string;
    abstract mkdir(path: string, option?: {
        recursive: true;
    }): Promise<void>;
    abstract exists(path: string): Promise<boolean>;
    abstract stat(path: string): Promise<{
        isFile: boolean;
        isDirectory: boolean;
        size: number;
        mtime: Date;
    }>;
    abstract rm(path: string): Promise<void>;
    abstract readdir(path: string): Promise<string[]>;
    abstract writeFile(option: {
        source: string;
        target: string;
        start?: number;
        end?: number;
        flags?: 'w' | 'a';
    }): Promise<void>;
}
