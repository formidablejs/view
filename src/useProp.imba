import { hasAttr } from './hasAttr'
import { isWaiting } from './isWaiting'
import { readProps } from './readProps'

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

def waitForProps interval\number = 100
	const condition = do ready === true

	const poll = do(resolve)
		if condition! then resolve!
		else setTimeout(&, interval) do poll(resolve)

	new Promise(poll)

# Get prop value.
#
# @param {string|null} prop
# @returns {any}
def useProp prop\string = null
	if prop
		if props['data-page'][prop]
			return props['data-page'][prop]
		else
			return props[prop]

	prop ? props[prop] : props

export {
	props
	Props
	waitForProps
	useProp
}
