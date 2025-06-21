const CACHE = new Map<string, unknown>();

export class Cache {
    static get(key: string): unknown {
        return CACHE.get(key);
    }

    static set(key: string, value: unknown): void {
        CACHE.set(key, value);
    }

    static has(key: string): boolean {
        return CACHE.has(key);
    }

    static delete(key: string): boolean {
        return CACHE.delete(key);
    }

    static clear(): void {
        CACHE.clear();
    }
}
