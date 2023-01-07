export class Route {
    constructor(name: string, params?: any);
    toPath(): string;
}

/**
 * Generate route.
 */
export function useRoute (name: string, params?: any): string;

export {
    Route,
    useRoute
}
