import { HttpBase, HttpDownloadOptions, HttpOptions, HttpResponse, HttpUploadOptions, StatefulPromise } from '../../../core/lib';
export declare class Http extends HttpBase {
    request<T, B = any>(options: HttpOptions<B>): StatefulPromise<HttpResponse<T>>;
    download(options: HttpDownloadOptions): StatefulPromise<void>;
    upload(options: HttpUploadOptions): StatefulPromise<any>;
}
