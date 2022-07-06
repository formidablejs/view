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
	     * @param {object|null} config
	     */
	
	/**
	*
	     * Instantiate form.
	     *
	     * @param {Object|null} form
	     * @param {object|null} config
	     
	*/
	constructor(form = {},config = {}){
		this[$__init__$]();
		this.form = $1.trim(form || {});
		this.config = config || {};
		this.processing = false;
		this.errors = {};
		this.formWasFilled = false;
		this.recentlySuccessful = false;
		
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
	get(path){
		
		return this.sendRequest('get',path);
	}
	
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
	head(path){
		
		return this.sendRequest('head',path);
	}
	
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
	post(path){
		
		return this.sendRequest('post',path);
	}
	
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
	put(path){
		
		return this.sendRequest('put',path);
	}
	
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
	delete(path){
		
		return this.sendRequest('delete',path);
	}
	
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
	options(path){
		
		return this.sendRequest('options',path);
	}
	
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
	patch(path){
		
		return this.sendRequest('patch',path);
	}
	
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
	async sendRequest(method,path){
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
		
		return window.axios[method.toLowerCase()](...args).then(function(response) {
			
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
			
			return Promise.resolve(response);
		}).catch(function(error) {
			
			self[$success$] = false;
			
			if (error.response.status === 422) { self.errors = error.response.data.errors };
			
			/** set fatal error. */
			
			if (error.response.status !== 422 && typeof error.response.status === 'number') {
				
				self[$fatal$] = {
					error: error.response.status,
					response: error.response.data
				};
			};
			
			return Promise.reject(error);
		}).finally(function() { return self.isProcessing(false); });
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
};
exports.Form = Form;
