import { AxiosResponse } from "axios";
import { FormConfig, RequestHandle } from "../ts";

export class Form<T> {
    /**
         * Instantiate form.
         *
         * @param {object|null} form
         * @param {FormConfig|null} config
         */
    /**
    *
         * Instantiate form.
         *
         * @param {object|null} form
         * @param {FormConfig|null} config

    @param {FormConfig} config
    */
    constructor(form?: T, config?: FormConfig | null);
    form: T;
    initialForm: T;
    config: FormConfig;
    processing: boolean;
    errors: Record<keyof T, string[]>;
    formWasFilled: boolean;
    recentlySuccessful: boolean;
    headers: {};
    /**
         * Reset form.
         *
         * @returns {void}
         */
    /**
    *
         * Reset form.
         *
         * @returns {void}

    */
    reset(): void;
    /**
         * Check if the form is processing.
         *
         * @returns {boolean}
         */
    /**
    *
         * Check if the form is processing.
         *
         * @returns {boolean}

    */
    get processingΦ(): boolean;
    /**
         * Check if form has errors.
         *
         * @var {boolean}
         */
    /**
    *
         * Check if form has errors.
         *
         * @var {boolean}

    */
    get hasErrors(): boolean;
    /**
         * Check if form was fatal.
         *
         * @var {boolean}
         */
    /**
    *
         * Check if form was fatal.
         *
         * @var {boolean}

    */
    get isFatalΦ(): boolean;
    /**
         * Get fatal error.
         *
         * @var {object|string}
         */
    /**
    *
         * Get fatal error.
         *
         * @var {object|string}

    */
    get fatalError(): any;
    /**
         * Check if request was successful.
         *
         * @var {boolean}
         */
    /**
    *
         * Check if request was successful.
         *
         * @var {boolean}

    */
    get isSuccessfulΦ(): any;
    /**
         * Check if form has been modified.
         *
         * @var {boolean} dirty
         */
    /**
    *
         * Check if form has been modified.
         *
         * @var {boolean} dirty

    */
    get isDirty(): boolean;
    /**
         * Check if form has not been modified.
         *
         * @var {boolean}
         */
    /**
    *
         * Check if form has not been modified.
         *
         * @var {boolean}

    */
    get isNotDirty(): boolean;
    /**
         * Clear all errors.
         *
         * @returns {Form}
         */
    /**
    *
         * Clear all errors.
         *
         * @returns {Form}

    */
    clearErrors(): Form<T>;
    /**
         * Fill Form body.
         *
         * @returns {void}
         */
    /**
    *
         * Fill Form body.
         *
         * @returns {void}

    */
    fill(): void;
    /**
         * Change processing status.
         *
         * @param {boolean} processing
         * @returns {Form}
         */
    /**
    *
         * Change processing status.
         *
         * @param {boolean} processing
         * @returns {Form}

    @param {boolean} processing
    */
    isProcessing(processing?: boolean): Form<T>;
    /**
         * Send get request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send get request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}

    @param {string} path
    @param {RequestHandle} config
    */
    get(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;
    /**
         * Send head request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send head request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}

    @param {string} path
    @param {RequestHandle} config
    */
    head(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;
    /**
         * Send post request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send post request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}

    @param {string} path
    @param {RequestHandle} config
    */
    post(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;
    /**
         * Send put request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send put request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}

    @param {string} path
    @param {RequestHandle} config
    */
    put(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;
    /**
         * Send delete request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send delete request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}

    @param {string} path
    @param {RequestHandle} config
    */
    delete(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;
    /**
         * Send options request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send options request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}

    @param {string} path
    @param {RequestHandle} config
    */
    options(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;
    /**
         * Send delete request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send delete request.
         *
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}

    @param {string} path
    @param {RequestHandle} config
    */
    patch(path: string, config?: RequestHandle | null): Promise<AxiosResponse>;

    on(name: string, params?: object|RequestHandle, config?: RequestHandle): Promise<AxiosResponse>;

    /**
         * Send request.
         *
         * @param {string} method request method.
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send request.
         *
         * @param {string} method request method.
         * @param {string} path route path.
         * @param {RequestHandle|null} config
         * @returns {Promise|null}

    @param {string} method
    @param {string} path
    @param {RequestHandle} config
    */
    sendRequest(method: string, path: string, config?: RequestHandle | null): Promise<AxiosResponse>;
    /**
         * Get request body object.
         *
         * @returns {object} body
         */
    /**
    *
         * Get request body object.
         *
         * @returns {object} body

    */
    body(): object;
    renderError(error: any): HTMLDivElement;
    [$__patch__$]($$?: {}): void;
    [$__init__$]($$?: any, deep?: boolean): void;
    [$fatal$]: any;
    [$success$]: any;
}
declare const $__patch__$: unique symbol;
declare const $__init__$: unique symbol;
declare const $fatal$: unique symbol;
declare const $success$: unique symbol;
export {};
