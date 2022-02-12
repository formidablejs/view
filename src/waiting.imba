export def isWaiting props
	let count = 0

	if Array.isArray(props)
		count = props.length
	elif (typeof props === 'object' || typeof props === 'function') && (props !== null)
		count = Object.keys(props).length

	count === 0
