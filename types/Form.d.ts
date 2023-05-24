import { AxiosResponse } from "axios";
import { FormConfig, RequestHandle, UploadProgress } from "../ts";

type FormRequest = {
    method: string;
    path: string;
}

declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
declare const $fatal$: unique symbol;
declare const $success$: unique symbol;

export class Form<T> {
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
    [$fatal$]: any;
    [$success$]: any;

    form: T;
    initialForm: T;
    config: FormConfig;
    processing: boolean;
    errors: Record<keyof T, string[]>;
    formWasFilled: boolean;
    recentlySuccessful: boolean;
    request?: FormRequest;
    headers: {};

    /**
     * Instantiate form.
     */
    constructor(form?: T, config?: FormConfig | null);

    /**
     * Reset form.
     */
    reset(): void;

    /**
	 * Reset upload progress.
	 */
    clearUploadProgress(): void;

    /**
     * Check if the form is processing.
     */
    get processingΦ(): boolean;

    /**
     * Check if form has errors.
     */
    get hasErrors(): boolean;

    /**
     * Check if form was fatal.
     */
    get isFatalΦ(): boolean;

    /**
     * Get fatal error.
     */
    get fatalError(): string|object;

    /**
     * Check if request was successful.
     */
    get isSuccessfulΦ(): boolean;

    /**
     * Check if form has been modified.
     */
    get isDirty(): boolean;

    /**
     * Check if form has not been modified.
     */
    get isNotDirty(): boolean;

    /**
	 * Check if form contains files.
	 */
    get hasFilesΦ(): boolean;

    /**
     * Get upload progress.
     */
    get progress(): UploadProgress | null;

    /**
     * Clear all errors.
     */
    clearErrors(): Form<T>;

    /**
     * Fill Form body.
     */
    fill(): void;

    /**
     * Change processing status.
     */
    isProcessing(processing?: boolean): Form<T>;

    /**
     * Send get request.
     */
    get(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;

    /**
     * Send head request.
     */
    head(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;

    /**
     * Send post request.
     */
    post(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;

    /**
     * Send put request.
     */
    put(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;

    /**
     * Send delete request.
     */
    delete(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;

    /**
     * Send options request.
     */
    options(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;

    /**
     * Send delete request.
     */
    patch(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;

    /**
     * Send request on specified route.
     */
    on(name: string, params?: object|RequestHandle, config?: RequestHandle): Promise<AxiosResponse>;

    /**
     * Set request method and path.
     */
    as(method: string, path: string): Form<T>;

    /**
     * Set request method and path using route name.
     */
    asRoute(name: string, params?: object): Form<T>;

    /**
     * Validate input.
     */
    validate(input: keyof T | keyof T[]): Promise<AxiosResponse>

    /**
     * Submit form.
     */
    submit(config?: RequestHandle): Promise<AxiosResponse>;

    /**
     * Send request.
     */
    sendRequest(method: string, path: string, config?: RequestHandle | null): Promise<AxiosResponse>;

    /**
     * Get request body object.
     */
    body(): object;

    /**
     * Render http error.
     */
    renderError(error: any): HTMLDivElement;
}
