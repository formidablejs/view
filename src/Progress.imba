import NProgress from "nprogress"

export class Progress

	static def calculatePercentage\DoubleRange|number loaded\number, total\number
		Math.floor(loaded * 1.0) / total

	static def init config\object = { showSpinner: false }
		const axios = globalThis.axios

		let requestsCounter = 0

		const setupStartProgress = do
			axios.interceptors.request.use do(conf)
				requestsCounter++

				if (NProgress)
					NProgress.start!

				conf

		const setupUpdateProgress = do
			const update = do(e)
				NProgress.inc(calculatePercentage(e.loaded, e.total))

			axios.defaults.onDownloadProgress = update
			axios.defaults.onUploadProgress = update

		const setupStopProgress = do
			const responseFunc = do(response)
				if --requestsCounter === 0
					NProgress.done!

				response

			const errorFunc = do(error)
				if --requestsCounter === 0
					NProgress.done!

				Promise.reject(error)

			axios.interceptors.response.use(responseFunc, errorFunc)

		NProgress.configure(config)

		setupStartProgress!
		setupUpdateProgress!
		setupStopProgress!
