import { trim } from './trim'
import { csrf } from './csrf'
import type { FormConfig } from '../ts'
import type { RequestHandle } from '../ts'

export class Form
	prop form
	prop initialForm
	prop config
	prop processing
	prop errors
	prop formWasFilled
	prop recentlySuccessful

	prop headers = {
		'X-FORMIDABLE-REQUEST': true
	}

	prop #fatal\{error: number; response: object} = {
		error: null
		response: null
	}
	prop #success = false

	/**
     * Instantiate form.
     *
     * @param {object|null} form
     * @param {FormConfig|null} config
     */
	def constructor form = {}, config\FormConfig = {}
		self.form = trim(form || {})
		self.initialForm = trim(form || {})
		self.config = config || {}
		self.processing = false
		self.errors = {}
		self.formWasFilled = false
		self.recentlySuccessful = false

		if self.config.headers
			self.headers = Object.assign(self.config.headers, self.headers)

		self.fill!

	/**
	 * Reset form.
	 *
	 * @returns {void}
	 */
	def reset
		self.form = trim(self.initialForm || {})

		self.processing = false
		self.errors = {}
		self.formWasFilled = false
		self.recentlySuccessful = false

		self.fill!

	/**
     * Check if the form is processing.
     *
     * @returns {boolean}
     */
	get processing?
		self.processing

	/**
     * Check if form has errors.
     *
     * @var {boolean}
     */
	get hasErrors
		Object.keys(self.errors).length > 0

	/**
	 * Check if form was fatal.
	 *
	 * @var {boolean}
	 */
	get isFatal?
		self.#fatal.error !== null && self.#fatal.error !== undefined

	/**
	 * Get fatal error.
	 *
	 * @var {object|string}
	 */
	get fatalError
		self.#fatal.response

	/**
	 * Check if request was successful.
	 *
	 * @var {boolean}
	 */
	get isSuccessful?
		self.#success

	/**
     * Check if form has been modified.
     *
     * @var {boolean} dirty
     */
	get isDirty
		let dirty = false

		Object.keys(self.form).forEach do(key)
			dirty = ((self[key] === true || self[key] === false) ? self[key] : self[key]?.trim!) !== self.form[key] ? true : dirty

		dirty

	/**
     * Check if form has not been modified.
     *
     * @var {boolean}
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
			self[key] = form[key] if !self.formWasFilled

		self.formWasFilled = true

	/**
     * Change processing status.
     *
     * @param {boolean} processing
     * @returns {Form}
     */
	def isProcessing processing\boolean = true
		self.processing = processing

		self

	/**
     * Send get request.
     *
     * @param {string} path route path.
     * @param {RequestHandle|null} config
     * @returns {Promise|null}
     */
	def get path\string, config\RequestHandle = null
		self.sendRequest('get', path, config)

	/**
     * Send head request.
     *
     * @param {string} path route path.
	 * @param {RequestHandle|null} config
     * @returns {Promise|null}
     */
	def head path\string, config\RequestHandle = null
		self.sendRequest('head', path, config)

	/**
     * Send post request.
     *
     * @param {string} path route path.
	 * @param {RequestHandle|null} config
     * @returns {Promise|null}
     */
	def post path\string, config\RequestHandle = null
		self.sendRequest('post', path, config)

	/**
     * Send put request.
     *
     * @param {string} path route path.
	 * @param {RequestHandle|null} config
     * @returns {Promise|null}
     */
	def put path\string, config\RequestHandle = null
		self.sendRequest('put', path, config)

	/**
     * Send delete request.
     *
     * @param {string} path route path.
	 * @param {RequestHandle|null} config
     * @returns {Promise|null}
     */
	def delete path\string, config\RequestHandle = null
		self.sendRequest('delete', path, config)

	/**
     * Send options request.
     *
     * @param {string} path route path.
	 * @param {RequestHandle|null} config
     * @returns {Promise|null}
     */
	def options path\string, config\RequestHandle = null
		self.sendRequest('options', path, config)

	/**
     * Send delete request.
     *
     * @param {string} path route path.
	 * @param {RequestHandle|null} config
     * @returns {Promise|null}
     */
	def patch path\string, config\RequestHandle = null
		self.sendRequest('patch', path, config)

	/**
     * Send request.
     *
     * @param {string} method request method.
     * @param {string} path route path.
	 * @param {RequestHandle|null} config
     * @returns {Promise|null}
     */
	def sendRequest method\string, path\string, config\RequestHandle = null
		self.isProcessing(true).fill!

		await csrf!
		await csrf!

		const args\any[] = [ path ]

		if !['get', 'head', 'options'].includes(method.toLowerCase!)
			args.push this.body!
		else
			let params = ''

			for own key, value of self.body!
				params += "&{key}={value}"

			if params !== ''
				args[0] = path + (path.indexOf('&') !== -1 ? params : "?{params.substring(1)}")

		args.push {
			headers: self.headers
		}

		window.axios[method.toLowerCase!](...args)
			.then(do(response)
				self.#success = true
				self.recentlySuccessful = true
				self.form = self.body!

				/** clear fatal error. */
				self.#fatal = {
					error: null
					response: null
				}

				setTimeout(&, self.config.recentlySuccessful || 2000) do
					self.recentlySuccessful = false

				Promise.resolve(response)

				if config && config.onSuccess
					config.onSuccess(response)
			)
			.catch(do(error)
				self.#success = false

				if error.response
					if error.response.status === 422 then self.errors = error.response.data.errors

					/** set fatal error. */
					if error.response.status !== 422 && typeof error.response.status === 'number'
						self.#fatal = {
							error: error.response.status
							response: error.response.data
						}

				Promise.reject(error)

				if config && config.onError
					config.onError(error)

				const shouldRenderServerError? = self.config.renderServerError ?? true

				if shouldRenderServerError? == true && (error.response.headers && error.response.headers.accept === 'text/html')
					self.renderError error
			)
			.finally(do
				self.isProcessing(false)

				if config && config.onComplete
					config.onComplete!
			)

	/**
     * Get request body object.
     *
     * @returns {object} body
     */
	def body
		const body = {}

		Object.keys(self.form).forEach do(key)
			Object.assign(body, { [key]: self[key] })

		body

	def renderError error
		const errorElement = document.createElement('iframe')
		const container    = document.createElement('div')
		const backdrop     = document.createElement('div')

		errorElement.srcdoc = error.response.data

		errorElement.style = `
			width: 90%;
			height: 90%;
			border: none;
			position: absolute;
			transform: translate(5.5%, 5%);
			border-radius: 10px;`

		container.style = `
			width: 90%;
			height: 90%;
			border: none;
			position: absolute;
			transform: translate(5.5%, 5%);
			border-radius: 10px;
			background: #fff;`

		backdrop.style = 'transition: all .3s ease; opacity: 0; background: rgb(16 16 16 / 68%);position: absolute; left:0; top: 0; width: 100%; height: 100%; z-index: 9999'

		backdrop.appendChild(container)
		backdrop.appendChild(errorElement)

		setTimeout(&, 1) do
			backdrop.style.opacity = 1

		backdrop.addEventListener 'click', do
			backdrop.style.opacity = 0

			setTimeout(&, 300) do
				backdrop.remove!

		document.body.appendChild(backdrop)
