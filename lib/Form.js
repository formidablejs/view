const $2 = Symbol.for('#fatal'), $3 = Symbol.for('#__init__'), $10 = Symbol.for('#__initor__'), $11 = Symbol.for('#__inited__'), $4 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./csrf'/*$path$*/);

class Form {
	[$3]($$ = null){
		var $5;
		this.form = $$ ? $$.form : undefined;
		this.config = $$ ? $$.config : undefined;
		this.processing = $$ ? $$.processing : undefined;
		this.errors = $$ ? $$.errors : undefined;
		this.formWasFilled = $$ ? $$.formWasFilled : undefined;
		this.recentlySuccessful = $$ ? $$.recentlySuccessful : undefined;
		this[$2] = ($$ && ($5 = $$[$2]) !== undefined) ? ($5) : {
			error: null,
			response: null
		};
		
	}
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
	constructor(form,config = {}){
		this[$3]();
		this.form = form;
		this.config = config;
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
		
		return this[$2].error !== null && this[$2].error !== undefined;
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
		
		return this[$2].response;
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
			
			if (!self.formWasFilled) {
				
				self[key] = (self.form[key] === true || self.form[key] === false) ? self.form[key] : (self.form[key]?.trim?.());
			};
			
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
		
		await $1.csrf();
		
		const args = [path];
		
		if (!(['get','head','options'].includes(method.toLowerCase()))) {
			
			args.push(this.body());
		} else {
			
			let params = '';
			
			for (let $8 = this.body(), $6 = 0, $7 = Object.keys($8), $9 = $7.length, key, value; $6 < $9; $6++){
				key = $7[$6];value = $8[key];
				params += ("&" + key + "=" + value);
			};
			
			if (params !== '') {
				
				args[0] = path + ((path.indexOf('&') !== -1) ? params : (("?" + params.substring(1))));
			};
		};
		
		return window.axios[method.toLowerCase()](...args).then(function(response) {
			
			self.recentlySuccessful = true;
			self.form = self.body();
			
			setTimeout(function() {
				
				return self.recentlySuccessful = false;
			},self.config.recentlySuccessful || 2000);
			
			return Promise.resolve(response);
		}).catch(function(error) {
			
			if (error.response.status === 422) { self.errors = error.response.data.errors };
			
			/** set fatal error. */
			
			if (error.response.status !== 422 && typeof error.response.status === 'number') {
				
				self[$2].error = error.response.status;
				self[$2].response = error.response.data;
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
