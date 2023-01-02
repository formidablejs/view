import { Prop } from '@formidablejs/console'
import { Form } from './Form'
import { MakeResourceCommand } from '@formidablejs/framework/lib/Foundation/Console/Commands/MakeResourceCommand'

export class MakeFormCommand < MakeResourceCommand

	get signature\string
		'make:form {name} {?--type} {?--resources}'

	get props
		{
			name: Prop.string().description('The name of the form')
			type: Prop.string().nullable().description('The type to use')
			resources: Prop.boolean().alias('r').default(false).description('Whether or not to use "./resources" as the default location')
		}

	get description\string
		'Create a new form'

	get resource\string
		'Form'

	get stub
		new Form(this.argument('name'), {
			type: this.option('type', null)
			resources: this.option('resources', false)
		}, 'form')
