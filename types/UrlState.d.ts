export type UrlStateConfig<T> = {
	onPageLoad?: (pageParams: T, params: T) => void
	onInitialLoad?: (params: T) => void
	onChange?: (key: keyof T, value: T[keyof T], params: T) => void
}

export function update<T = unknown>(params: T): void

export function populate<T = unknown>(params: T, allowedKeys: string[]): void

export function documentParams<T = unknown>(): T

export class UrlState<T> {
    constructor(params: T, config?: UrlStateConfig<T>)

    /**
     * Update url state without triggering onChange event.
     *
     * @throws {Error} If key is not allowed.
     */
    quitelyUpdate<K extends keyof T>(key: K, value: T[K]): boolean
}
