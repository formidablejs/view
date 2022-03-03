const $2 = Symbol.for('#__init__'), $5 = Symbol.for('#__initor__'), $6 = Symbol.for('#__inited__'), $3 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('./csrf'/*$path$*/);

class Form {
	[$2]($$ = null){
		this.form = $$ ? $$.form : undefined;
		this.config = $$ ? $$.config : undefined;
		this.processing = $$ ? $$.processing : undefined;
		this.errors = $$ ? $$.errors : undefined;
		this.formWasFilled = $$ ? $$.formWasFilled : undefined;
		this.recentlySuccessful = $$ ? $$.recentlySuccessful : undefined;
		
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
		this[$2]();
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
	async post(path){
		var self = this;
		
		this.isProcessing(true).fill();
		
		await $1.csrf();
		
		return window.axios.post(path,this.body()).then(function(response) {
			var $4;
			
			self.recentlySuccessful = true;
			self.form = self.body();
			
			setTimeout(function() {
				
				return self.recentlySuccessful = false;
			},(($4 = self.config.recentlySuccessful) != null) ? ($4) : 2000);
			
			return Promise.resolve(response);
		}).catch(function(error) {
			
			if (error.response.status === 422) { self.errors = error.response.data.errors };
			
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
