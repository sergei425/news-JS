import { SourcesApi } from "../../types/SourceApi";

class Loader {
    baseLink: string;
    options: Record<string, string | number>;

    constructor(baseLink: string, options: Record<string, string | number>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        endpoint: string,
        options: Record<string, string | number>,
        callback: (data: T) => void
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string | number>, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T = SourcesApi[]>(method: string, endpoint: string, callback: (data: T) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((source) => callback(source))
            .catch((err) => console.error(err));
    }
}

export default Loader;
