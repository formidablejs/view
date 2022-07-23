import { hasAttr } from '@formidablejs/view'
import { isWaiting } from '@formidablejs/view'
import { readProps } from '@formidablejs/view'

let props = { }
let ready = false

tag Props
	def render
		<self>
			if isWaiting(props) && hasAttr(self)
				props = readProps(self)
				ready = true
			elif !hasAttr(self)
				ready = true

def waitForProps
	const condition = do ready === true

	const poll = do(resolve)
		if condition! then resolve!
		else setTimeout(&, 100) do poll(resolve)
	
	new Promise(poll)

export {
	props
	Props
	waitForProps
}