import { Cache } from "../utils/Cache";

export async function useFetch(url: string, options: RequestInit = {}) {
    if (Cache.has(url)) {
        return Cache.get(url);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    Cache.set(url, data);

    return data;
}
