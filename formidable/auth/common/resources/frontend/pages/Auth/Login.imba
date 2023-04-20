import { useProp } from '@formidablejs/view'
import { useForm } from '@formidablejs/view'

export tag Login

	prop user\User = useProp('user')

	prop form = useForm({
		email: null
		password: null
	})

	def routed
		if user then router.go('/')

	def render
		<self>
			<h1> "Login"

			<form @submit.prevent=form.on('login').then(do globalThis.location.assign('/'))>
				<label[d:block mb:3]>
					"Email Address"
					<input[d:block bw:1px] [bc:red5]=form.errors.email type="email" placeholder="Email Address" name="email" bind=form.email required>

					if form.errors.email
						<p[c:red5]> error for error in form.errors.email

				<label[d:block mb:3]>
					"Password"
					<input[d:block bw:1px] [bc:red5]=form.errors.password type="password" placeholder="Password" name="password" bind=form.password required>

					if form.errors.password
						<p[c:red5]> error for error in form.errors.password

				<a route-to="/forgot-password"> "Forgot your password?"

				<div[d:block]>
					<button[bw:1px]> "Login"

				<div[mt:10px]>
					<span> "Or"
					<a[ml:4px] route-to="/register"> "Create an Account"
