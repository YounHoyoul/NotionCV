import NodeCache from 'node-cache';
import type CacheServiceInterface from "./CacheServiceInterface";

export default class CacheService implements CacheServiceInterface {
    readonly cache: NodeCache;

    constructor() {
        this.cache = new NodeCache();
    }

    get(key: string) {
        return this.cache.get(key);
    }

    put(key: string, value: any, ttl?: number): boolean {
        if (ttl) {
            return this.cache.set(key, value, ttl)
        }

        return this.cache.set(key, value);
    }

    async remember(key: string, ttl: number, callback: Function) {
        let value = this.get(key);

        if (!value) {
            value = await callback();
            this.put(key, value, ttl);
        }

        return value;
    }

    async rememberForever(key: string, callback: Function) {
        let value = this.get(key);

        if (!value) {
            value = await callback();
            this.put(key, value);
        }

        return value;
    }
}