import { trim } from './trim'
import { Route } from './useRoute'
import type { FormConfig } from '../ts'
import type { RequestHandle } from '../ts'
import type { UploadProgress } from '../ts'

export class Form
	prop form
	prop initialForm
	prop config
	prop processing
	prop errors
	prop formWasFilled
	prop recentlySuccessful
	prop #_progress = {
		loaded: null
		total: null
		bytes: null
		rate: null
		percentage: null
	}

	prop request = null

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
		self.processing = false
		self.errors = {}
		self.formWasFilled = false
		self.recentlySuccessful = false

		self.config = {
			recentlySuccessful: config.recentlySuccessful ?? (globalConfig.recentlySuccessful ?? undefined)
			renderServerError: config.renderServerError ?? (globalConfig.renderServerError ?? undefined)
		}

		if self.config.headers
			self.headers = Object.assign(self.config.headers, self.headers)

		self.fill!

	get globalConfig
		globalThis.FormConfig || {}

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

		self.fill!

	/**
	 * Reset upload progress.
	 *
	 * @returns {void}
	 */
	def clearUploadProgress
		self.#_progress = {
			loaded: null
			total: null
			percentage: null
		}

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
	 * Check if form contains files.
	 *
	 * @var {boolean}
	 */
	get hasFiles?
		let files = false

		Object.values(this.body!).forEach(do(i)
			if i instanceof File
				files = true
		)

		files

	/**
	 * Get upload progress.
	 *
	 * @returns {UploadProgress}
	 */
	get progress
		if #_progress.percentage == null
			return null

		#_progress

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

	# Send request on specified route.
	def on\Promise<any> name\string, params\object|RequestHandle = {}, config\RequestHandle = null
		config = (config == null || config == undefined) && (params.onSuccess || params.onError || params.onComplete) ? params : config
		params = params.onSuccess || params.onError || params.onComplete ? {} : params

		const route = new Route(name, params)

		sendRequest(route.method, route.toPath(), config)

	def as method\string, path\string
		self.request = {
			method: method
			path: path
		}

		this

	def submit config\RequestHandle = null
		this.config.customHeaders = {}

		sendRequest(self.request.method, self.request.path, config)

	def validate input\string|string[]
		self.config.customHeaders = {
			'X-FORMIDABLE-VALIDATE': Array.isArray(input) ? input.join(',') : input
		}

		sendRequest(self.request.method, self.request.path, self.config)

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

		const args\any[] = [ path ]

		if !['get', 'head', 'options'].includes(method.toLowerCase!)
			args.push this.body!
		else
			let params = ''

			for own key, value of self.body!
				params += "&{key}={value}"

			if params !== ''
				args[0] = path + (path.indexOf('&') !== -1 ? params : "?{params.substring(1)}")

		if self.hasFiles?
			self.headers['Content-Type'] = 'multipart/form-data'

		const headers = {}

		Object.assign(headers, self.headers, (config && config.customHeaders) ? config.customHeaders : {})

		args.push {
			headers: headers
		}

		args[args.length - 1]['onUploadProgress'] = do(progressEvent)
			self.#_progress.loaded = progressEvent.loaded
			self.#_progress.total = progressEvent.total
			self.#_progress.bytes = progressEvent.bytes
			self.#_progress.rate = progressEvent.rate
			self.#_progress.percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)

			imba.commit!

		globalThis.axios[method.toLowerCase!](...args)
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
					imba.commit!

				if response.status === 204 && config && config.customHeaders && config.customHeaders['X-FORMIDABLE-VALIDATE']
					const input = config.customHeaders['X-FORMIDABLE-VALIDATE'].split(',')

					for key in input
						delete self.errors[key] if self.errors[key]

				if config && config.onSuccess
					config.onSuccess(response)

				response
			)
			.catch(do(error)
				self.#success = false

				if error.response
					if error.response.status === 422
						if config && config.customHeaders && config.customHeaders['X-FORMIDABLE-VALIDATE']
							self.errors = Object.assign(self.errors, error.response.data.errors)
						else
							self.errors = error.response.data.errors

					/** set fatal error. */
					if error.response.status !== 422 && typeof error.response.status === 'number'
						self.#fatal = {
							error: error.response.status
							response: error.response.data
						}

				if config && config.onError
					config.onError(error)

				const shouldRenderServerError? = self.config.renderServerError ?? true

				if shouldRenderServerError? == true && (error.response && error.response.headers && error.response.headers.accept === 'text/html')
					self.renderError error

				if !config || (config && !config.onError)
					Promise.reject(error)
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
			body[key] = self[key]

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
			position: fixed;
			transform: translate(5.5%, 5%);
			border-radius: 10px;
			background: #fff;`

		backdrop.style = 'transition: all .3s ease; opacity: 0; background: rgb(16 16 16 / 68%);position: fixed; left:0; top: 0; width: 100%; height: 100%; z-index: 9999'

		backdrop.appendChild(container)
		backdrop.appendChild(errorElement)

		setTimeout(&, 1) do
			backdrop.style.opacity = 1

		backdrop.addEventListener 'click', do
			backdrop.style.opacity = 0

			setTimeout(&, 300) do
				backdrop.remove!

		document.body.appendChild(backdrop)
