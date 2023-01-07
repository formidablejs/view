import { Progress } from './Progress'
import NProgress from "nprogress"

global css
	#nprogress
		pe:none

	#nprogress .bar
		pos:fixed zi:1031 t:0 l:0
		w:100% h:2px

	#nprogress .peg
		d:block pos:absolute r:0px w:100px h:100%
		-webkit-transform:rotate(3deg) translate(0px, -4px)
		-ms-transform:rotate(3deg) translate(0px, -4px)
		transform:rotate(3deg) translate(0px, -4px)

	#nprogress .spinner
		d:block pos:fixed zi:1031 t:15px r:15px

	#nprogress .spinner-icon
		w:18px h:18px box-sizing:border-box
		bd:solid rd:50%
		-webkit-animation:nprogress-spinner 400ms linear infinite
		animation:nprogress-spinner 400ms linear infinite

	.nprogress-custom-parent
		of:hidden pos:relative

	.nprogress-custom-parent #nprogress .spinner, .nprogress-custom-parent #nprogress .bar
		pos:absolute

	@keyframes nprogress-spinner
		0% transform:rotate(0deg)
		100% transform:rotate(360deg)

export tag FormProgress

	prop color\string = '#29d'
	prop minimum\number
	prop template\string
	prop easing\string
	prop speed\number
	prop trickle\boolean
	prop trickleSpeed\number
	prop showSpinner\boolean = false
	prop parent\string
	prop positionUsing\string
	prop barSelector\string
	prop observeUrl\boolean = false

	def mount\void
		addMissingCss!

		Progress.init({
			minimum: minimum,
			template: template,
			easing: easing,
			speed: speed,
			trickle: trickle,
			trickleSpeed: trickleSpeed,
			showSpinner: showSpinner,
			parent: parent,
			positionUsing: positionUsing,
			barSelector: barSelector,
		})

		if observeUrl
			showProgressOnUrlChanges!

	def showProgressOnUrlChanges\void
		let previousUrl = ''

		const observer = new MutationObserver do(mutation)
			if window.location.href !== previousUrl
				previousUrl = window.location.href

				NProgress.done(true)

		const config = {
			subtree: true,
			childList: true
		}

		observer.observe(document, config)

	def addMissingCss
		const style = document.createElement('style')

		style.textContent = '#nprogress .bar { background: ' + color + '; } #nprogress .peg { box-shadow: 0 0 10px ' + color + ', 0 0 5px ' + color + ';}#nprogress .spinner-icon {border-color: ' + color + '; border-top-color: ' + color + ';border-left-color: transparent;-webkit-animation: nprogress-spinner 400ms linear infinite;animation: nprogress-spinner 400ms linear infinite;}@-webkit-keyframes nprogress-spinner {0% {-webkit-transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg);}}'

		document.head.appendChild(style)

	def render\FormProgress
		<self>
