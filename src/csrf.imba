export def csrf
	globalThis.axios.get('/csrf-cookie')
