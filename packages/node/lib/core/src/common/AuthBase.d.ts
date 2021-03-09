export declare abstract class AuthBase {
    cookie: string;
    abstract login(cookie: string): Promise<string>;
    abstract logout(): Promise<void>;
    abstract setCookie(cookie: string): boolean;
    abstract removeCookie(): void;
}
