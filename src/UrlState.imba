export def update\void params\object
	if !history.pushState then return

	const searchParams = new URLSearchParams(window.location.search)

	for own key, value of params
		if value !== null && value !== ''
			searchParams.set key, value
		else
			searchParams.delete key

	const updatedUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString()

	window.history.pushState({path: updatedUrl}, '', updatedUrl)

export def populate params, allowedKeys = []
	const paramsToPopulate = {}

	Object.keys(params).forEach do(key)
		if allowedKeys.includes(key) && params[key] !== null && params[key] !== ''
			paramsToPopulate[key] = params[key]

	if Object.keys(paramsToPopulate).length > 0
		update paramsToPopulate

export def documentParams
	let searchParams = new URLSearchParams(window.location.search)
	let params = {}

	for [key, value] of searchParams.entries()
		params[key] = value

	params

export class UrlState
	prop #params
	prop #config

	def constructor params, config = {}
		#config = config

		const pageParams = documentParams!
		const initialParams = Object.assign {}, params

		#params = Object.assign params, pageParams

		if #config.onPageLoad
			#config.onPageLoad pageParams, #params

		const allowedKeys = Object.keys params

		populate params, allowedKeys

		window.addEventListener 'popstate', do(event)
			const pageParams = documentParams!

			#params = { ...initialParams }

			for key in allowedKeys when pageParams[key] != undefined and pageParams[key] != '' and pageParams[key] != null
				#params[key] = pageParams[key]

			if #config.onPageLoad
				#config.onPageLoad pageParams, #params

		if #config.onInitialLoad
			#config.onInitialLoad initialParams

		return new Proxy this, {
			get: do(target, key, e)
				if key == 'quitelyUpdate'
					return do(key, value)
						if #params[key] !== undefined
							#params[key] = value

							return true

						throw new Error "UrlState: no such param: {key}"

				if params[key] !== undefined then return #params[key]

				throw new Error "UrlState: no such param: {key}"

			set: do(target, key, value)
				if params[key] !== undefined
					#params[key] = value

					update #params

					if #config.onChange
						#config.onChange key, value, #params

					return true

				throw new Error "UrlState: no such param: {key}"
		}
