import { ServiceResolver } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'
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

	def boot
		View.prototype.routes = routes

		self.app.registerCommand(MakeFormCommand)
