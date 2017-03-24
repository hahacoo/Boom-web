import './style'
import template from './view'

export default {

	template,

	props: {

		icon: String
	},

	computed: {

		className() {

			let begin = 0,
				prefix = 'fa-'

			return this.icon.slice(begin, prefix.length) === prefix 
				? this.icon 
				: prefix + this.icon
		}
	}
}