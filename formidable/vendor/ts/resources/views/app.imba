import { View } from '@formidablejs/framework'
import { Props } from '@formidablejs/view'

export class App < View

	def render
		const locale = get('locale', config('app.locale', new String)).replace(/_/g, '-')

		<html lang=locale>
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>
				<title> config('app.name', 'Formidable')

				<link rel='stylesheet' href='https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap'>
				<style src="*">

			<body>
				<script type="module" src="../frontend/main.imba">

				# load props from the server
				<Props html:data-page=dataPage!>
