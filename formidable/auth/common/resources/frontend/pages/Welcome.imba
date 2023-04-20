import { useForm } from '@formidablejs/view'
import { useProp } from '@formidablejs/view'

export tag Welcome
	prop formidableVersion\string = useProp('formidableVersion')
	prop nodeVersion\string = useProp('nodeVersion')
	prop user\User = useProp('user')

	def logout
		useForm().on('logout', {
			onSuccess: do globalThis.location.reload()
		})

	def render
		<self>
			<div.container>
				<div.content>
					<div.logo>
						<img src="../../assets/logo.png">
						<p> "+"
						<img src="https://raw.githubusercontent.com/imba/branding-imba/04d4fca156c665554debb78317a7d6b608953d31/imba-icon.svg">

					<div.welcome>
						<h4> "Yey! You have successfully created a new Formidable project."

					<div[d:flex g:1 jc:center].auth>
						if user
							<button @click=logout> "Logout"
							<p[lh:5px]> "Hello, {user.name} 👋"
						else
							<button route-to="/register"> "Register"
							<button route-to="/login"> "Login"

					<ul.links>
						<li> <a href="https://formidablejs.org/" target="_blank" rel="noopener"> "Formidable"
						<li> <a href="https://imba.io/" target="_blank" rel="noopener"> "Imba"
						<li> <a href="https://github.com/formidablejs" target="_blank" rel="noopener"> "Github"
						<li> <a href="https://twitter.com/formidablejs" target="_blank" rel="noopener"> "Twitter"

					<div.information>
						"Formidable v{formidableVersion ?? "undefined"} (Node {nodeVersion ?? "undefined"})"
