import { csrf } from './csrf'

export class Form
	prop form
	prop config
	prop processing
	prop errors
	prop formWasFilled
	prop recentlySuccessful

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
     * Send post request.
     *
     * @param {String} path route path.
     * @returns {Promise}
     */
	def post path\String
		self.isProcessing(true).fill!

		await csrf!

		window.axios.post(path, this.body!)
			.then(do(response)
				self.recentlySuccessful = true
				self.form = self.body!

				setTimeout(&, self.config.recentlySuccessful ?? 2000) do
					self.recentlySuccessful = false

				Promise.resolve(response)
			)
			.catch(do(error)
				if error.response.status === 422 then self.errors = error.response.data.errors

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
