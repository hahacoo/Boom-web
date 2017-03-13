import './style'
import template from './view'

export default {

	template,

	data() {

		return {

			message: '',
			type: ''
		}
	},

	props: {

		vertical: {

			type: String,
			default: 'top'
		}, 

		horizontal: {

			type: String,
			default: 'right'
		},

		duration: {

			type: Number,
			default: 4000
		}
	},

	computed: {

		position() {

			return this.vertical + ' ' + this.horizontal
		}
	},

	created() {

		this.$subscibe('notice.open', (message, type = 'notice') => {

			this.message = message
			this.type = type
			this.$refs.snackbar.open()
		})
	},

	
}