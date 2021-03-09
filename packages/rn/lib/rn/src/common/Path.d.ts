import { PathBase } from '../../../core/lib';
export declare class Path extends PathBase {
    constructor();
    /**
     * 把路径变为绝对路径，只允许一个参数
     */
    resolve(p: string): Promise<string>;
}
