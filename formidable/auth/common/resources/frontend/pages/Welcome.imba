import { useForm } from '@formidablejs/view'
import { useProp } from '@formidablejs/view'

export tag Welcome

	css
		ul list-style-type: none p:0
		li d:inline-block m:0 10px

	prop user\User = useProp('user')

	def logout
		useForm().on('logout', {
			onSuccess: do window.location.reload()
		})

	def render
		<self[ta:center d:flex ai:center jc:center h:80vh]>
			<div>
				<section>
					<img[w:150px p:10px] alt="Formidable logo" src="../../assets/logo.png">

				<section[d:flex g:1 jc:center]>
					<p[fw:bolder]> "Congrats!"
					<p> "Your app is ready with Auth scaffolding"

				<p[font-style:italic]> "Your frontend is located at { <code> './resources/frontend' }"

				<section[d:flex g:1 jc:center]>
					if user
						<a[p:2 bgc:black c:white cursor:pointer td:underline] @click=logout> "Logout"
						<p[lh:5px]> "Hello, {user.name} 👋"
					else
						<a[p:2 bgc:black c:white] route-to="/register"> "Register"
						<a[p:2 bgc:black c:white] route-to="/login"> "Login"

				<section>
					<h3[m:40px 0 0]> "Essential Links"

					<ul>
						<li> <a href="https://formidablejs.org/" target="_blank" rel="noopener"> "Formidable Docs"
						<li> <a href="https://imba.io/" target="_blank" rel="noopener"> "Imba Docs"
						<li> <a href="https://github.com/formidablejs" target="_blank" rel="noopener"> "Github"
						<li> <a href="https://twitter.com/formidablejs" target="_blank" rel="noopener"> "Twitter"
