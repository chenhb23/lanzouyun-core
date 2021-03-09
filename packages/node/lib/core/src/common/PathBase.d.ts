/**
 * path need full path
 */
export declare abstract class PathBase {
    sep: string;
    abstract resolve(p: string): Promise<string>;
    join(...paths: string[]): string;
    basename(p: string, ext?: string): string;
    dirname(p: string): string;
    extname(p: string): string;
}
