import './bootstrap'
import { waitForProps } from './props'
import { App } from './App'

def main
	await waitForProps!

	imba.mount <App>

main!
