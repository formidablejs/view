import { ServiceResolver } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'
import { without } from '@formidablejs/framework/lib/Support/Helpers'
import { MakeFormCommand } from './Commands/MakeFormCommand'

export class ViewServiceResolver < ServiceResolver

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
		const payload = without(this.data, [
			'_flashed',
			'_old',
			'csrf_token'
		])

		const routes = {}

		for route in Route.all!
			if route.name
				routes[route.name] = {
					method: route.method
					path: route.path
					params: route.path.match(/\:[a-zA-Z]+/gm) ?? {}
				}

		payload.routes = routes

		JSON.stringify(payload)

	def boot
		View.prototype.routes = routes
		View.prototype.dataPage = dataPage

		self.app.registerCommand(MakeFormCommand)
