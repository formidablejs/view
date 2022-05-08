const $3 = Symbol.for('#fatal'), $4 = Symbol.for('#success'), $5 = Symbol.for('#__init__'), $12 = Symbol.for('#__initor__'), $13 = Symbol.for('#__inited__'), $6 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./trim'/*$path$*/);
var $2 = require('./csrf'/*$path$*/);

class Form {
	[$5]($$ = null){
		var $7;
		this.form = $$ ? $$.form : undefined;
		this.config = $$ ? $$.config : undefined;
		this.processing = $$ ? $$.processing : undefined;
		this.errors = $$ ? $$.errors : undefined;
		this.formWasFilled = $$ ? $$.formWasFilled : undefined;
		this.recentlySuccessful = $$ ? $$.recentlySuccessful : undefined;
		this[$3] = ($$ && ($7 = $$[$3]) !== undefined) ? ($7) : {
			error: null,
			response: null
		};
		this[$4] = ($$ && ($7 = $$[$4]) !== undefined) ? ($7) : false;
		
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
		this[$5]();
		this.form = form || {};
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
		
		return this[$3].error !== null && this[$3].error !== undefined;
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
		
		return this[$3].response;
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
		
		return this[$4];
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
		
		const form = $1.trim(this.form);
		
		Object.keys(form).forEach(function(key) {
			
			if (!self.formWasFilled) { self[key] = form[key] };
			
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
		
		const args = [path];
		
		if (!(['get','head','options'].includes(method.toLowerCase()))) {
			
			args.push(this.body());
		} else {
			
			let params = '';
			
			for (let $10 = this.body(), $8 = 0, $9 = Object.keys($10), $11 = $9.length, key, value; $8 < $11; $8++){
				key = $9[$8];value = $10[key];
				params += ("&" + key + "=" + value);
			};
			
			if (params !== '') {
				
				args[0] = path + ((path.indexOf('&') !== -1) ? params : (("?" + params.substring(1))));
			};
		};
		
		return window.axios[method.toLowerCase()](...args).then(function(response) {
			
			self[$4] = true;
			self.recentlySuccessful = true;
			self.form = self.body();
			
			/** clear fatal error. */
			
			self[$3] = {
				error: null,
				response: null
			};
			
			setTimeout(function() {
				
				return self.recentlySuccessful = false;
			},self.config.recentlySuccessful || 2000);
			
			return Promise.resolve(response);
		}).catch(function(error) {
			
			self[$4] = false;
			
			if (error.response.status === 422) { self.errors = error.response.data.errors };
			
			/** set fatal error. */
			
			if (error.response.status !== 422 && typeof error.response.status === 'number') {
				
				self[$3] = {
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
