import { HttpBase, HttpDownloadOptions, HttpOptions, HttpResponse, HttpUploadOptions, StatefulPromise } from 'lanzou-core';
export declare class Http extends HttpBase {
    request<T, B>({ headers, body, url, method, onProgress }: HttpOptions<B>): StatefulPromise<HttpResponse<T>>;
    download(options: HttpDownloadOptions): StatefulPromise<void>;
    upload(options: HttpUploadOptions): StatefulPromise<string>;
}
