export interface MkdirOption {
    parentId: string;
    folderName: string;
    folderDescription?: string;
}
export declare function mkdir(option: MkdirOption): Promise<string>;
