import { useRoute } from '@formidablejs/view'
import { useProp } from '@formidablejs/view'
import { useForm } from '@formidablejs/view'

export tag PasswordReset

	prop user\User = useProp('user')

	prop form = useForm({
		password: null
		password_confirmation: null
	})

	def reset
		form.post(useRoute('password.reset') + router.location.url.search, {
			onSuccess: do form.reset()
		})

	def routed
		if user then router.go('/')

	def render
		<self>
			<h1> "Reset Password"

			<form @submit.prevent=reset>
				if form.isSuccessful?
					<p[c:green5]> "You have successfully changed your password"

					<section[mb:8px]>
						"Click"
						<a route-to="/login"> " here "
						"to login"

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
					<button[bw:1px]> "Reset Password"
