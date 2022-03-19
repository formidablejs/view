export def rescue func\Promise<any>|Function, default\any = undefined
	if func instanceof Promise
		let res

		func.then(do(response) res = response).catch(do res = default)

		return res

	try
		return func!
	catch
		return default
