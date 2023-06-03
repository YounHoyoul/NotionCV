
export default interface CacheServiceInterface {
    get(key: string): any;
    put(key: string, value: any, ttl?: number): boolean;
    remember(key: string, ttl: number, callback: Function) : any;
    rememberForever(key: string, callback: Function) : any;
}