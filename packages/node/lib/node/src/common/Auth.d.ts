import { AuthBase } from 'lanzou-core';
export declare class Auth extends AuthBase {
    constructor();
    login(cookie: any): Promise<string>;
    logout(): Promise<void>;
    removeCookie(): void;
    setCookie(cookie: any): boolean;
}
