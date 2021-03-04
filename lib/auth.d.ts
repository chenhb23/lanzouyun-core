export declare let cookie: string;
/**
 * 返回 cookie
 */
export declare function login(): Promise<string>;
export declare function setCookie(value: string): boolean;
export declare function logout(): void;
