export interface StatefulPromise<T> extends Promise<T> {
    cancel: () => void;
}
export interface HttpOptions<B> {
    url: string;
    method: 'post' | 'get' | 'POST' | 'GET';
    headers?: Record<string, any>;
    body?: B;
    onProgress?: (received: number) => void;
}
export interface HttpResponse<T> {
    json: () => Promise<T>;
    text: () => Promise<string>;
    headers?: Record<string, any>;
}
export interface HttpDownloadOptions {
    url: string;
    path: string;
    onProgress?: (received: number, total: number) => void;
}
export interface HttpUploadOptions {
    path: string;
    folderId: string;
    start?: number;
    end?: number;
    size?: number;
    name?: string;
    mtime?: Date;
}
export declare abstract class HttpBase {
    abstract request<T, B = any>(options: HttpOptions<B>): StatefulPromise<HttpResponse<T>>;
    abstract download(options: HttpDownloadOptions): StatefulPromise<void>;
    abstract upload(options: HttpUploadOptions): StatefulPromise<any>;
}
export declare const baseHeaders: {
    accept: string;
    'content-type': string;
    'accept-language': string;
    pragma: string;
    'sec-fetch-dest': string;
    'sec-fetch-mode': string;
    'sec-fetch-site': string;
};
