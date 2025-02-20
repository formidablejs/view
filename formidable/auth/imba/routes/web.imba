import { App } from '../resources/views/app'
import { Request } from '@formidablejs/framework'
import { Route } from '@formidablejs/framework'

# --------------------------------------------------------------------------
# Web Routes
# --------------------------------------------------------------------------
#
# Here is where you can register web routes for your application. These
# routes are loaded by the RouteServiceResolver within a group which
# is assigned the "session" middleware group.

Route.get('/*', do(request\Request)
	view(App, {
		formidableVersion: request.version,
		nodeVersion: process.version,
		user: request.auth!.check! ? without(request.user!, [
			'password', 'remember_token'
		]) : null
	})
)
