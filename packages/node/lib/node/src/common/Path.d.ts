import { PathBase } from 'lanzou-core';
export declare class Path extends PathBase {
    constructor();
    resolve(p: string): Promise<string>;
}
