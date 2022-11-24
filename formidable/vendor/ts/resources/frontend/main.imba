import './bootstrap'
import { waitForProps } from '@formidablejs/view'
import { App } from './App'

def main
	await waitForProps!

	imba.mount <App>

main!
