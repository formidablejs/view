import { AxiosResponse, AxiosError } from 'axios'
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

	get globalConfig\FormConfig|object
		globalThis.FormConfig || {}

	def reset\void
		self.form = trim(self.initialForm || {})

		self.processing = false
		self.errors = {}
		self.formWasFilled = false

		self.fill!

	def clearUploadProgress\void
		self.#_progress = {
			loaded: null
			total: null
			percentage: null
		}

	get processing?\boolean
		self.processing

	get hasErrors\boolean
		Object.keys(self.errors).length > 0

	get isFatal?\boolean
		self.#fatal.error !== null && self.#fatal.error !== undefined

	get fatalError\object|string
		self.#fatal.response

	get isSuccessful?\boolean
		self.#success

	get isDirty\boolean
		let dirty = false

		Object.keys(self.form).forEach do(key)
			dirty = ((self[key] === true || self[key] === false) ? self[key] : self[key]?.trim!) !== self.form[key] ? true : dirty

		dirty

	get isNotDirty\boolean
		self.isDirty === false

	get hasFiles?\boolean
		let files = false

		Object.values(this.body!).forEach(do(i)
			if i instanceof File
				files = true
		)

		files

	get progress\UploadProgress
		if #_progress.percentage == null
			return null

		#_progress

	def clearErrors\Form
		self.errors = {}

		self

	def fill\void
		Object.keys(self.form).forEach do(key)
			self[key] = form[key] if !self.formWasFilled

		self.formWasFilled = true

	def isProcessing\Form processing\boolean = true
		self.processing = processing

		self

	def get\Promise|null path\string, config\RequestHandle = null
		self.sendRequest('get', path, config)

	def head\Promise|null path\string, config\RequestHandle = null
		self.sendRequest('head', path, config)

	def post\Promise|null path\string, config\RequestHandle = null
		self.sendRequest('post', path, config)

	def put\Promise|null path\string, config\RequestHandle = null
		self.sendRequest('put', path, config)

	def delete\Promise|null path\string, config\RequestHandle = null
		self.sendRequest('delete', path, config)

	def options\Promise|null path\string, config\RequestHandle = null
		self.sendRequest('options', path, config)

	def patch\Promise|null path\string, config\RequestHandle = null
		self.sendRequest('patch', path, config)

	def on\Promise<any> name\string, params\object|RequestHandle = {}, config\RequestHandle = null
		config = (config == null || config == undefined) && (params.onSuccess || params.onError || params.onComplete) ? params : config
		params = params.onSuccess || params.onError || params.onComplete ? {} : params

		const route = new Route(name, params)

		sendRequest(route.method, route.toPath(), config)

	def as\Form method\string, path\string
		self.request = {
			method: method
			path: path
		}

		this

	def asRoute\Form name\string, params\object = {}
		const route = new Route(name, params)

		self.request = {
			method: route.method
			path: route.toPath()
		}

		this

	def submit\Promise|null config\RequestHandle = null
		this.config.customHeaders = {}

		sendRequest(self.request.method, self.request.path, config)

	def validate\Promise|null input\string|string[]
		self.config.customHeaders = {
			'X-FORMIDABLE-VALIDATE': Array.isArray(input) ? input.join(',') : input
		}

		sendRequest(self.request.method, self.request.path, self.config)

	def sendRequest\Promise|null method\string, path\string, config\RequestHandle = null
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

		if config && config.canAbort
			const abortController = new AbortController!

			args[args.length - 1]['signal'] = abortController.signal

			config.canAbort(abortController)

		args[args.length - 1]['onUploadProgress'] = do(progressEvent)
			self.#_progress.loaded = progressEvent.loaded
			self.#_progress.total = progressEvent.total
			self.#_progress.bytes = progressEvent.bytes
			self.#_progress.rate = progressEvent.rate
			self.#_progress.percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)

			imba.commit!

		globalThis.axios[method.toLowerCase!](...args)
			.then(do(response)
				if response.status === 204 && config && config.customHeaders && config.customHeaders['X-FORMIDABLE-VALIDATE']
					const input = config.customHeaders['X-FORMIDABLE-VALIDATE'].split(',')

					for key in input
						delete self.errors[key] if self.errors[key]
				else
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

					if config && config.onSuccess
						config.onSuccess(response)

				response
			)
			.catch(do(error)
				self.#success = false

				if globalThis.axios.isCancel(error)
					return config.onAbort ? config.onAbort(error) : console.error(error.message)

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

	def body\object
		const body = {}

		Object.keys(self.form).forEach do(key)
			body[key] = self[key]

		body

	def renderError error\AxiosError
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
