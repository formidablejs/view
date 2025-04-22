const { ServiceResolver } = require '@formidablejs/framework'
const { Route } = require '@formidablejs/framework'
const { View } = require '@formidablejs/framework'
const { without } = require '@formidablejs/framework/lib/Support/Helpers'
const { imbaEnv } = require '@formidablejs/framework/lib/Support/Helpers'
const { MakeFormCommand } = require './Commands/MakeFormCommand'

exports.ViewServiceResolver = class ViewServiceResolver < ServiceResolver

	def routes
		const named = {}

		for route in Route.all!
			if route.name
				named[route.name] = {
					method: route.method
					path: route.path
					params: route.path.match(/\:[a-zA-Z]+/gm) ?? {}
				}

		JSON.stringify(named)

	def dataPage
		const payload = {
			props: without(this.data, [
				'_flashed',
				'_old',
				'csrf_token'
			])
			env: imbaEnv(false)
		}

		const routes = {}

		for route in Route.all!
			if route.name
				routes[route.name] = {
					method: route.method
					path: route.path
					params: route.path.match(/\:[a-zA-Z]+/gm) ?? []
				}

		payload.props.routes = routes

		JSON.stringify(payload)

	def boot
		View.prototype.routes = routes
		View.prototype.dataPage = dataPage

		self.app.registerCommand(MakeFormCommand)
