export let props: {};
export class Props {
    render(): Props;
}

/**
 * Wait for all props to be loaded.
 */
export function waitForProps(interval?: number): Promise<any>;

/**
 * Get specific prop or all props.
 */
export function useProp<T>(prop?: string): T;
