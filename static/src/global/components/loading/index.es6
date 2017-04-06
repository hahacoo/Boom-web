import './style'
import template from './view'

export default {

	template,

	data() {

		return {

			enable: true
		}
	},

	methods: {

		animationend() {

			this.enable = false
		}
	}
}