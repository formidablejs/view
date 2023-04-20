import { useProp } from '@formidablejs/view'
import { useForm } from '@formidablejs/view'

export tag Register

	prop user\User = useProp('user')

	prop form = useForm({
		name: null
		email: null
		password: null
		password_confirmation: null
	})

	def routed
		if user then router.go('/')

	def render
		<self>
			<h1> "Create an Account"

			<form @submit.prevent=form.on('register').then(do globalThis.location.assign('/'))>
				<label[d:block mb:3]>
					"Full Name"
					<input[d:block bw:1px] [bc:red5]=form.errors.name type="text" placeholder="Full Name" name="name" bind=form.name required>

					if form.errors.name
						<p[c:red5]> error for error in form.errors.name

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

				<label[d:block mb:3]>
					"Password Confirmation"
					<input[d:block bw:1px] [bc:red5]=form.errors.password_confirmation type="password" placeholder="Password Confirmation" name="password_confirmation" bind=form.password_confirmation required>

					if form.errors.password_confirmation
						<p[c:red5]> error for error in form.errors.password_confirmation

				<div[d:block]>
					<button[bw:1px]> "Create Account"
