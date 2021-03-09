export interface SplitOption {
    path: string;
    splitSize?: string | number;
    maxSize?: string | number;
    /**
     * 仅返回分割结果，不进行实际操作，节省存储空间
     */
    skipSplit?: boolean;
    /**
     * 输出目录，默认文件当前（临时？）目录
     */
    outputPath?: string;
}
export interface SplitData {
    isFile: boolean;
    path: string;
    name: string;
    size: number;
    lastModifiedDate: Date;
    files: {
        path: string;
        sourcePath: string;
        name: string;
        size: number;
        lastModifiedDate: Date;
        startByte?: number;
        endByte?: number;
    }[];
}
/**
 * @example
 ```
  split({
    path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png',
    splitSize: '100k',
    maxSize: '100k',
  }).then(value => {
    console.log('finish')
  })
 ```
 */
export declare function split(option: SplitOption): Promise<SplitData>;
export declare function encodeName(filename: string): string;
/**
 * 如果是支持的后缀，仅添加 index? 其实也是读取不出来的
 */
export declare function encodeIndexName(filename: string, index: number): string;
export declare function decodeName(filename: string): string;
