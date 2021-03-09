export interface MergeOption {
    path: string | string[];
    outputPath: string;
}
/**
 * @example
 ```
  merge({
    path: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7',
    outputPath: 'DF1E5B4D-459A-4295-B441-61A93D0CCCA7.png',
  }).then(console.log)
 ```
 */
export declare function merge(option: MergeOption): Promise<boolean>;
