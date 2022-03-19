import { csrf } from './csrf'

export class Form
	prop form
	prop config
	prop processing
	prop errors
	prop formWasFilled
	prop recentlySuccessful
	prop #fatal\{error: number; response: object} = {
		error: null
		response: null
	}

	/**
     * Instantiate form.
     *
     * @param {Object} form
     * @param {object|null} config
     */
	def constructor form, config = {}
		self.form = form
		self.config = config
		self.processing = false
		self.errors = {}
		self.formWasFilled = false
		self.recentlySuccessful = false

		self.fill!

	/**
     * Check if the form is processing.
     *
     * @returns {Boolean}
     */
	get processing?
		self.processing

	/**
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
	get isFatal?
		self.#fatal.error !== null && self.#fatal.error !== undefined

	/**
	 * Get fatal error.
	 *
	 * @var {Object|String}
	 */
	get fatalError
		self.#fatal.response

	/**
	 * Check if request was successful.
	 *
	 * @var {Boolean}
	 */
	get isSuccessful?
		self.#fatal.error == undefined && self.#fatal.error == null && self.hasErrors == false

	/**
     * Check if form has been modified.
     *
     * @var {Boolean} dirty
     */
	get isDirty
		let dirty = false

		Object.keys(self.form).forEach do(key)
			dirty = ((self[key] === true || self[key] === false) ? self[key] : self[key]?.trim!) !== self.form[key] ? true : dirty

		dirty

	/**
     * Check if form has not been modified.
     *
     * @var {Boolean}
     */
	get isNotDirty
		self.isDirty === false

	/**
     * Clear all errors.
     *
     * @returns {Form}
     */
	def clearErrors
		self.errors = {}

		self

	/**
     * Fill Form body.
     *
     * @returns {void}
     */
	def fill
		Object.keys(self.form).forEach do(key)
			if !self.formWasFilled
				self[key] = (self.form[key] === true || self.form[key] === false) ? self.form[key] : self.form[key]?.trim!

			self.errors[key] = ''

		self.formWasFilled = true

	/**
     * Change processing status.
     *
     * @param {Boolean} processing
     * @returns {Form}
     */
	def isProcessing processing\Boolean = true
		self.processing = processing

		self

	/**
     * Send get request.
     *
     * @param {String} path route path.
     * @returns {Promise}
     */
	def get path\String
		self.sendRequest('get', path)
	
	/**
     * Send head request.
     *
     * @param {String} path route path.
     * @returns {Promise}
     */
	def head path\String
		self.sendRequest('head', path)

	/**
     * Send post request.
     *
     * @param {String} path route path.
     * @returns {Promise}
     */
	def post path\String
		self.sendRequest('post', path)
	
	/**
     * Send put request.
     *
     * @param {String} path route path.
     * @returns {Promise}
     */
	def put path\String
		self.sendRequest('put', path)
	
	/**
     * Send delete request.
     *
     * @param {String} path route path.
     * @returns {Promise}
     */
	def delete path\String
		self.sendRequest('delete', path)
	
	/**
     * Send options request.
     *
     * @param {String} path route path.
     * @returns {Promise}
     */
	def options path\String
		self.sendRequest('options', path)
	
	/**
     * Send delete request.
     *
     * @param {String} path route path.
     * @returns {Promise}
     */
	def patch path\String
		self.sendRequest('patch', path)

	/**
     * Send request.
     *
     * @param {String} method request method.
     * @param {String} path route path.
     * @returns {Promise}
     */
	def sendRequest method\String, path\String
		self.isProcessing(true).fill!

		await csrf!

		const args = [ path ]

		if !['get', 'head', 'options'].includes(method.toLowerCase!)
			args.push this.body!
		else
			let params = ''

			for own key, value of self.body!
				params += "&{key}={value}"
			
			if params !== ''
				args[0] = path + (path.indexOf('&') !== -1 ? params : "?{params.substring(1)}")

		window.axios[method.toLowerCase!](...args)
			.then(do(response)
				self.recentlySuccessful = true
				self.form = self.body!

				/** clear fatal error. */
				self.#fatal = { error: null, response: null }

				setTimeout(&, self.config.recentlySuccessful || 2000) do
					self.recentlySuccessful = false

				Promise.resolve(response)
			)
			.catch(do(error)
				if error.response.status === 422 then self.errors = error.response.data.errors

				/** set fatal error. */
				if error.response.status !== 422 && typeof error.response.status === 'number'
					self.#fatal = {
						error: error.response.status
						response: error.response.data
					}

				Promise.reject(error)
			)
			.finally(do self.isProcessing(false))

	/**
     * Get request body object.
     *
     * @returns {Object} body
     */
	def body
		const body = {}

		Object.keys(self.form).forEach do(key)
			Object.assign(body, { [key]: self[key] })

		body
