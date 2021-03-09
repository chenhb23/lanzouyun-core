import { AuthBase } from '../../../core/lib';
export declare class Auth extends AuthBase {
    constructor();
    login(cookie: string): Promise<string>;
    logout(): Promise<void>;
    removeCookie(): void;
    setCookie(cookie: string): boolean;
}
