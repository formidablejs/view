import { useProp } from '@formidablejs/view'
import { useForm } from '@formidablejs/view'

export tag ForgotPassword

	prop user\User = useProp('user')

	prop form = useForm({
		email: null
	})

	def routed
		if user then router.go('/')

	def render
		<self>
			<h1> "Forgot your password?"

			<form @submit.prevent=form.on('password.forgot').then(do form.reset())>
				<label[d:block mb:3]>
					"Email Address"
					<input[d:block bw:1px] [bc:red5]=form.errors.email type="email" placeholder="Email Address" name="email" bind=form.email required>

					if form.errors.email
						<p[c:red5]> error for error in form.errors.email

					if form.isSuccessful?
						<p[c:green5]> "Password reset instructions have been sent to your email"

				<div[d:block]>
					<button[bw:1px]> "Send Reset Password Instructions"
