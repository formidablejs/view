import { join } from 'path'
import { Stub } from '@formidablejs/stubs'

export class Form < Stub

	get props
		{
			type: {
				type: String
				required: false
			}
			resources: {
				type: Boolean
				required: false
			}
		}

	get data
		{
			name: this.realClassName
			formType: this.formType
		}

	get stub\string
		join(__dirname, 'stub')

	get fileName\string
		this.realClassName + '.ts'

	get formType\string
		if this.options.type
			return "<{this.options.type}>"

		''

	get destination\string
		if this.options.resources
			return 'resources'

		'resources/frontend'
