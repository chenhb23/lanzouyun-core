/**
 * 延时函数
 */
export declare const delay: (ms?: number) => Promise<void>;
export declare const match: {
    iframe: (html: string) => string;
    sign: (html: string) => string;
    signs: (html: string) => string;
    websign: (html: string) => string;
    ves: (html: string) => string;
    t: (html: string) => string;
    k: (html: string) => string;
    lx: (html: string) => string;
    fid: (html: string) => string;
    uid: (html: string) => string;
    rep: (html: string) => string;
    up: (html: string) => string;
    ls: (html: string) => string;
    data: (html: string) => string;
    titleWithoutPwd: (html: string) => string;
    title: (html: string) => string;
    sizeWithoutPwd: (html: string) => string;
    sizeWithPwd: (html: string) => string;
};
/**
 * 请求url，返回 text
 */
export declare function html(url: string): Promise<string>;
export declare function parseUrl(url: string): {
    origin: string;
    id: string;
};
