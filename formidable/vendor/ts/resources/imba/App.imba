import { props } from './props'
import { Home } from './pages/Home'
import { About } from './pages/About'

export tag App
	css @off o:0

	def render
		<self[ff:Nunito ta:center] ease>
			<nav[p:7 fs:large]>
				<a[fw:bold] route-to="/"> "Home"
				" | "
				<a[fw:bold] route-to="/about"> "About"

			<Home route="/">
			<About route="/about">
