const $fatal$ = Symbol.for('#fatal'), $success$ = Symbol.for('#success'), $__init__$ = Symbol.for('#__init__'), $__patch__$ = Symbol.for('#__patch__'), $__initor__$ = Symbol.for('#__initor__'), $__inited__$ = Symbol.for('#__inited__'), $__hooks__$ = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./trim'/*$path$*/);
var $2 = require('./csrf'/*$path$*/);
class Form {
	[$__patch__$]($$ = {}){
		var $3;
		($3 = $$.form) !== undefined && (this.form = $3);
		($3 = $$.config) !== undefined && (this.config = $3);
		($3 = $$.processing) !== undefined && (this.processing = $3);
		($3 = $$.errors) !== undefined && (this.errors = $3);
		($3 = $$.formWasFilled) !== undefined && (this.formWasFilled = $3);
		($3 = $$.recentlySuccessful) !== undefined && (this.recentlySuccessful = $3);
		($3 = $$.headers) !== undefined && (this.headers = $3);
		($3 = $$[$fatal$]) !== undefined && (this[$fatal$] = $3);
		($3 = $$[$success$]) !== undefined && (this[$success$] = $3);
		
	}
	[$__init__$]($$ = null,deep = true){
		var $4;
		this.form = $$ ? $$.form : undefined;
		this.config = $$ ? $$.config : undefined;
		this.processing = $$ ? $$.processing : undefined;
		this.errors = $$ ? $$.errors : undefined;
		this.formWasFilled = $$ ? $$.formWasFilled : undefined;
		this.recentlySuccessful = $$ ? $$.recentlySuccessful : undefined;
		this.headers = ($$ && ($4 = $$.headers) !== undefined) ? ($4) : {
			'X-FORMIDABLE-REQUEST': true
		};
		this[$fatal$] = ($$ && ($4 = $$[$fatal$]) !== undefined) ? ($4) : {
			error: null,
			response: null
		};
		this[$success$] = ($$ && ($4 = $$[$success$]) !== undefined) ? ($4) : false;
		
	}
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
	constructor(form = {},config = {}){
		this[$__init__$]();
		this.form = $1.trim(form || {});
		this.config = config || {};
		this.processing = false;
		this.errors = {};
		this.formWasFilled = false;
		this.recentlySuccessful = false;
		
		if (this.config.headers) {
			
			this.headers = Object.assign(this.config.headers,this.headers);
		};
		
		this.fill();
	}
	
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
	get processingΦ(){
		
		return this.processing;
	}
	
	/**
	     * Check if form has errors.
	     *
	     * @var {Boolean}
	     *
		get hasErrors
			Object.keys(self.errors).length > 0
	
		\/\**
		 * Check if form was fatal.
		 *
		 * @var {Boolean}
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
		 * Check if form was fatal.
		 *
		 * @var {Boolean}
		 
	*/
	get isFatalΦ(){
		
		return this[$fatal$].error !== null && this[$fatal$].error !== undefined;
	}
	
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
	get fatalError(){
		
		return this[$fatal$].response;
	}
	
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
	get isSuccessfulΦ(){
		
		return this[$success$];
	}
	
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
	get isDirty(){
		var self = this;
		
		let dirty = false;
		
		Object.keys(self.form).forEach(function(key) {
			
			return dirty = (((self[key] === true || self[key] === false) ? self[key] : (self[key]?.trim?.())) !== self.form[key]) ? true : dirty;
		});
		
		return dirty;
	}
	
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
	get isNotDirty(){
		
		return this.isDirty === false;
	}
	
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
	clearErrors(){
		
		this.errors = {};
		
		return this;
	}
	
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
	fill(){
		var self = this;
		
		Object.keys(self.form).forEach(function(key) {
			
			if (!self.formWasFilled) { self[key] = self.form[key] };
			
			return self.errors[key] = '';
		});
		
		return self.formWasFilled = true;
	}
	
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
	isProcessing(processing = true){
		
		this.processing = processing;
		
		return this;
	}
	
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
	get(path,config = null){
		
		return this.sendRequest('get',path,config);
	}
	
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
	head(path,config = null){
		
		return this.sendRequest('head',path,config);
	}
	
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
	post(path,config = null){
		
		return this.sendRequest('post',path,config);
	}
	
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
	put(path,config = null){
		
		return this.sendRequest('put',path,config);
	}
	
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
	delete(path,config = null){
		
		return this.sendRequest('delete',path,config);
	}
	
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
	options(path,config = null){
		
		return this.sendRequest('options',path,config);
	}
	
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
	patch(path,config = null){
		
		return this.sendRequest('patch',path,config);
	}
	
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
	async sendRequest(method,path,config = null){
		var self = this;
		
		this.isProcessing(true).fill();
		
		await $2.csrf();
		await $2.csrf();
		
		const args = [path];
		
		if (!(['get','head','options'].includes(method.toLowerCase()))) {
			
			args.push(this.body());
		} else {
			
			let params = '';
			
			for (let $7 = this.body(), $5 = 0, $6 = Object.keys($7), $8 = $6.length, key, value; $5 < $8; $5++){
				key = $6[$5];value = $7[key];
				params += ("&" + key + "=" + value);
			};
			
			if (params !== '') {
				
				args[0] = path + ((path.indexOf('&') !== -1) ? params : (("?" + params.substring(1))));
			};
		};
		
		args.push({
			headers: this.headers
		});
		
		const response = window.axios[method.toLowerCase()](...args).then(function(response) {
			
			self[$success$] = true;
			self.recentlySuccessful = true;
			self.form = self.body();
			
			/** clear fatal error. */
			
			self[$fatal$] = {
				error: null,
				response: null
			};
			
			setTimeout(function() {
				
				return self.recentlySuccessful = false;
			},self.config.recentlySuccessful || 2000);
			
			Promise.resolve(response);
			
			if (config && config.onSuccess) {
				
				return config.onSuccess(response);
			};
		}).catch(function(error) {
			var $9;
			
			self[$success$] = false;
			
			if (error.response.status === 422) { self.errors = error.response.data.errors };
			
			/** set fatal error. */
			
			if (error.response.status !== 422 && typeof error.response.status === 'number') {
				
				self[$fatal$] = {
					error: error.response.status,
					response: error.response.data
				};
			};
			
			Promise.reject(error);
			
			if (config && config.onError) {
				
				config.onError(error);
			};
			
			const shouldRenderServerErrorΦ = (($9 = self.config.renderServerError) != null) ? ($9) : true;
			
			if (shouldRenderServerErrorΦ == true && (error.response.headers && error.response.headers.accept === 'text/html')) {
				
				return self.renderError(error);
			};
		}).finally(function() {
			
			self.isProcessing(false);
			
			if (config && config.onComplete) {
				
				return config.onComplete();
			};
		});
		
		
		if (config && (config.onSuccess || config.onError || config.onComplete)) {
			
			return;
		};
		
		return response;
	}
	
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
	body(){
		var self = this;
		
		const body = {};
		
		Object.keys(self.form).forEach(function(key) {
			
			return Object.assign(body,{[key]: self[key]});
		});
		
		return body;
	}
	
	renderError(error){
		
		const errorElement = globalThis.document.createElement('iframe');
		const container = globalThis.document.createElement('div');
		const backdrop = globalThis.document.createElement('div');
		
		errorElement.srcdoc = error.response.data;
		
		errorElement.style = `\n			width: 90%;\n			height: 90%;\n			border: none;\n			position: absolute;\n			transform: translate(5.5%, 5%);\n			border-radius: 10px;`;
		
		container.style = `\n			width: 90%;\n			height: 90%;\n			border: none;\n			position: absolute;\n			transform: translate(5.5%, 5%);\n			border-radius: 10px;\n			background: #fff;`;
		
		backdrop.style = 'transition: all .3s ease; opacity: 0; background: rgb(16 16 16 / 68%);position: absolute; left:0; top: 0; width: 100%; height: 100%; z-index: 9999';
		
		backdrop.appendChild(container);
		backdrop.appendChild(errorElement);
		
		setTimeout(function() {
			
			return backdrop.style.opacity = 1;
		},1);
		
		backdrop.addEventListener('click',function() {
			
			backdrop.style.opacity = 0;
			
			return setTimeout(function() {
				
				return backdrop.remove();
			},300);
		});
		
		return globalThis.document.body.appendChild(backdrop);
	}
};
exports.Form = Form;
