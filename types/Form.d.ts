export class Form {
    /**
         * Instantiate form.
         *
         * @param {Object} form
         * @param {object|null} config
         */
    /**
    *
         * Instantiate form.
         *
         * @param {Object} form
         * @param {object|null} config
         
    */
    constructor(form: any, config?: object | null);
    form: any;
    config: any;
    processing: boolean;
    errors: {};
    formWasFilled: boolean;
    recentlySuccessful: boolean;
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
         *
        get hasErrors
            Object.keys(self.errors).length > 0
    
        \/\**
         * Check if form has been modified.
         *
         * @var {Boolean} dirty
         */
    /**
    *
         * Check if form has errors.
         *
         * @var {Boolean}
         *
        get hasErrors
            Object.keys(self.errors).length > 0
    
        /**
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
         * @returns {Promise}
         */
    /**
    *
         * Send get request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         
    @param {String} path
    */
    get(path: string): Promise<any>;
    /**
         * Send head request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         */
    /**
    *
         * Send head request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         
    @param {String} path
    */
    head(path: string): Promise<any>;
    /**
         * Send post request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         */
    /**
    *
         * Send post request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         
    @param {String} path
    */
    post(path: string): Promise<any>;
    /**
         * Send put request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         */
    /**
    *
         * Send put request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         
    @param {String} path
    */
    put(path: string): Promise<any>;
    /**
         * Send delete request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         */
    /**
    *
         * Send delete request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         
    @param {String} path
    */
    delete(path: string): Promise<any>;
    /**
         * Send options request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         */
    /**
    *
         * Send options request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         
    @param {String} path
    */
    options(path: string): Promise<any>;
    /**
         * Send delete request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         */
    /**
    *
         * Send delete request.
         *
         * @param {String} path route path.
         * @returns {Promise}
         
    @param {String} path
    */
    patch(path: string): Promise<any>;
    /**
         * Send request.
         *
         * @param {String} method request method.
         * @param {String} path route path.
         * @returns {Promise}
         */
    /**
    *
         * Send request.
         *
         * @param {String} method request method.
         * @param {String} path route path.
         * @returns {Promise}
         
    @param {String} method
    @param {String} path
    */
    sendRequest(method: string, path: string): Promise<any>;
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
    [$1]($$?: any): void;
}
declare const $1: unique symbol;
export {};
