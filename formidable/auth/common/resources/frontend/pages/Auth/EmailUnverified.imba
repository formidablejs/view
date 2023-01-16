import { useForm } from '@formidablejs/view'
import { useProp } from '@formidablejs/view'

export tag EmailUnverified

	prop user\User = useProp('user')

	prop form = useForm({
		email: null
	})

	def mount
		form.email = user.email

	def routed
		if !user then router.go('/login')

		if user.email_verified_at
			router.go('/')

	def resend
		form.on('email.resend')

	def render
		<self>
			<h1> "Verify Account"

			<p> "Your account is not verified, please check your mailbox for the verification link"

			if form.isSuccessful?
				<p[c:green5]> "A new verification link has been sent to {form.email}"

			<section>
				"Click "
				<a href="#" @click.prevent=resend> "here"
				" to resend the verification link"
