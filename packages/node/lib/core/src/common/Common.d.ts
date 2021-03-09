import { HttpBase } from './HttpBase';
import { FileSystemBase } from './FileSystemBase';
import { PathBase } from './PathBase';
import { AuthBase } from './AuthBase';
declare class Common {
    http: HttpBase;
    fs: FileSystemBase;
    path: PathBase;
    auth: AuthBase;
    set(value: Partial<Common>): void;
}
export declare const common: Common;
export {};
