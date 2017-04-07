import './style'
import template from './view'

export default {

	template,

	data() {

		return {

			apps: []
		}
	},

	mounted() {

		this.$nextTick(() => {

			this.$publish('progress.stop')
		})
	}
}