import { useProp } from './useProp'

class Route

	prop _name\string
	prop _route\object
	prop _params\object|null

	def constructor name\string, params\object = {}
		const routes = useProp('routes')

		if !routes
			throw new Error "Route list is missing."

		if !routes[name]
			throw new Error "Route '{name}' is not in the route list."

		this._name = name
		this._route = routes[name]
		this._params = params

	get method
		this._route.method

	def toPath\string
		let query = {}
		const compiledPath = []

		Object.keys(this._params).forEach(do(key)
			if !self._route.params[key] && key !== '_query'
				query[key] = self._params[key]
		)

		this._route.path.split('/').forEach(do(value)
			if value.startsWith(':')
				value = value.slice(1)

				if !Object.keys(self._params).includes(value)
					throw new Error "Route '{self._name}' is missing '{value}' param."

				else value = self._params[value]

			compiledPath.push value
		)

		query = (new URLSearchParams(Object.assign(query, (this._params._query ?? {})))).toString()

		compiledPath.join('/') + (query.length > 0 ? "?{query}" : '')

	def toUrl\string
		toPath()

def useRoute\string name\string, params\object = {}
	new Route(name, params).toPath()

export {
	Route,
	useRoute
}
