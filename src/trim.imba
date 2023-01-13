export def trim object\Object
	if object && typeof object === 'object'
		Object.keys(object).map do(key)
			if typeof object[key] === 'object' && !(object[key] instanceof File)
				object[key] = trim(object[key])
			elif typeof object[key] === 'string'
				object[key] = object[key].trim!

	object
