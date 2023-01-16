import { useProp } from '@formidablejs/view'
import { useForm } from '@formidablejs/view'

export tag EmailVerification

	prop user\User = useProp('user')

	prop form = useForm()

	def routed
		if !user
			router.go('/login')

		if user.email_verified_at
			router.go('/')

	def verify
		form.post(router.location.url.href, {
			onSuccess: do router.go('/')
		})

	def render
		<self>
			<h1> "Verify Account"

			if form.isFatal? || form.hasErrors
				<p[c:red5]> "Email could not be verified"
			else
				<section[d:inline-block]>
					"Click "
					<a href="#" @click.prevent=verify> "here"
					" to verify your account"
