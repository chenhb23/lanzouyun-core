export declare class Event {
    listens: {
        [event: string]: {
            once: boolean;
            fn: any;
        }[];
    };
    on(event: string, fn: any, isOnce?: boolean): void;
    once(event: string, fn: any): void;
    off(event: string, fn?: any): void;
    emit(event: string, ...args: any[]): void;
}
