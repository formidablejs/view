import { Form } from './Form'
import type { FormConfig } from '../ts'

export def useForm body = {}, config\FormConfig = {}
	new Form(body || {}, config || {})
