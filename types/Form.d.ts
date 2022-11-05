export class Form {
    /**
         * Instantiate form.
         *
         * @param {Object|null} form
         * @param {FormConfig|null} config
         */
    /**
    *
         * Instantiate form.
         *
         * @param {Object|null} form
         * @param {FormConfig|null} config
         
    @param {FormConfig} config
    */
    constructor(form?: any | null, config?: FormConfig | null);
    form: any;
    initialForm: any;
    config: any;
    processing: boolean;
    errors: {};
    formWasFilled: boolean;
    recentlySuccessful: boolean;
    headers: any;
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
         * @returns {Boolean}
         */
    /**
    *
         * Check if the form is processing.
         *
         * @returns {Boolean}
         
    */
    get processingΦ(): boolean;
    /**
         * Check if form has errors.
         *
         * @var {Boolean}
         */
    /**
    *
         * Check if form has errors.
         *
         * @var {Boolean}
         
    */
    get hasErrors(): boolean;
    /**
         * Check if form was fatal.
         *
         * @var {Boolean}
         */
    /**
    *
         * Check if form was fatal.
         *
         * @var {Boolean}
         
    */
    get isFatalΦ(): boolean;
    /**
         * Get fatal error.
         *
         * @var {Object|String}
         */
    /**
    *
         * Get fatal error.
         *
         * @var {Object|String}
         
    */
    get fatalError(): any;
    /**
         * Check if request was successful.
         *
         * @var {Boolean}
         */
    /**
    *
         * Check if request was successful.
         *
         * @var {Boolean}
         
    */
    get isSuccessfulΦ(): any;
    /**
         * Check if form has been modified.
         *
         * @var {Boolean} dirty
         */
    /**
    *
         * Check if form has been modified.
         *
         * @var {Boolean} dirty
         
    */
    get isDirty(): boolean;
    /**
         * Check if form has not been modified.
         *
         * @var {Boolean}
         */
    /**
    *
         * Check if form has not been modified.
         *
         * @var {Boolean}
         
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
    clearErrors(): Form;
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
         * @param {Boolean} processing
         * @returns {Form}
         */
    /**
    *
         * Change processing status.
         *
         * @param {Boolean} processing
         * @returns {Form}
         
    @param {Boolean} processing
    */
    isProcessing(processing?: boolean): Form;
    /**
         * Send get request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send get request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         
    @param {String} path
    @param {RequestConfig} config
    */
    get(path: string, config?: RequestConfig | null): Promise<any> | null;
    /**
         * Send head request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send head request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         
    @param {String} path
    @param {RequestConfig} config
    */
    head(path: string, config?: RequestConfig | null): Promise<any> | null;
    /**
         * Send post request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send post request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         
    @param {String} path
    @param {RequestConfig} config
    */
    post(path: string, config?: RequestConfig | null): Promise<any> | null;
    /**
         * Send put request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send put request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         
    @param {String} path
    @param {RequestConfig} config
    */
    put(path: string, config?: RequestConfig | null): Promise<any> | null;
    /**
         * Send delete request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send delete request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         
    @param {String} path
    @param {RequestConfig} config
    */
    delete(path: string, config?: RequestConfig | null): Promise<any> | null;
    /**
         * Send options request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send options request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         
    @param {String} path
    @param {RequestConfig} config
    */
    options(path: string, config?: RequestConfig | null): Promise<any> | null;
    /**
         * Send delete request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send delete request.
         *
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         
    @param {String} path
    @param {RequestConfig} config
    */
    patch(path: string, config?: RequestConfig | null): Promise<any> | null;
    /**
         * Send request.
         *
         * @param {String} method request method.
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         */
    /**
    *
         * Send request.
         *
         * @param {String} method request method.
         * @param {String} path route path.
         * @param {RequestConfig|null} config
         * @returns {Promise|null}
         
    @param {String} method
    @param {String} path
    @param {RequestConfig} config
    */
    sendRequest(method: string, path: string, config?: RequestConfig | null): Promise<any> | null;
    /**
         * Get request body object.
         *
         * @returns {Object} body
         */
    /**
    *
         * Get request body object.
         *
         * @returns {Object} body
         
    */
    body(): any;
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
