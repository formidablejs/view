import without from '@formidablejs/framework/lib/Support/Helpers/without'

export def readProps component
	let props = { }

	for prop in component.attributes
		if prop === undefined || prop === null || (prop && prop.nodeValue === "html:{prop.name}")
			continue

		try
			const value = JSON.parse(prop.nodeValue)

			if prop.name === 'data-page' && value.constructor === Object && value.env && value.env.constructor === Object
				props[prop.name] = without(value, ['env'])

				process.env = value.env
			else
				props[prop.name] = value

		catch
			props[prop.name] = prop.nodeValue

	component.remove!

	props
