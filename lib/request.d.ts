/// <reference types="node" />
import FormData from 'form-data';
import http from 'node:http';
export declare const baseHeaders: {
    accept: string;
    'content-type': string;
    'accept-language': string;
    pragma: string;
    'sec-fetch-dest': string;
    'sec-fetch-mode': string;
    'sec-fetch-site': string;
};
interface RequestExtraOptions {
    body?: Record<string, any> | FormData | string;
    onData?: (bytes: number) => void;
    signal?: AbortSignal;
    /**
     * @default utf8
     */
    encoding?: BufferEncoding;
}
interface ResponseOptions<T> extends http.IncomingMessage {
    response: T;
}
/**
 * 请求函数，不用做下载
 * todo: cookie
 */
export declare function request<T = any>(url: string, { body, onData, signal, encoding, ...options }?: http.RequestOptions & import("tls").SecureContextOptions & {
    rejectUnauthorized?: boolean;
    servername?: string;
} & RequestExtraOptions): Promise<ResponseOptions<T>>;
export {};
