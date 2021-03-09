export declare class Chain {
    private queue;
    private canceled;
    cancel(): void;
    add(fn: any): this;
    start(args?: any): Promise<void>;
}
