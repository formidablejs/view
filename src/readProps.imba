export def readProps component
	let props = { }

	for prop in component.attributes
		if prop !== undefined && prop.name !== 'class'
			try
				const value = JSON.parse(prop.nodeValue)

				if prop.name == 'env' && value.constructor == Object
					process.env = value

					component.removeAttribute(prop.name)
				else
					props[prop.name] = value

			catch
				props[prop.name] = prop.nodeValue

	props
