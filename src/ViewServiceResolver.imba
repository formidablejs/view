import { ServiceResolver } from '@formidablejs/framework'
import { MakeFormCommand } from './Commands/MakeFormCommand'

export class ViewServiceResolver < ServiceResolver

	def boot
		self.app.registerCommand(MakeFormCommand)
