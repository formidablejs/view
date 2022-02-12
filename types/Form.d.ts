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
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
export {};
