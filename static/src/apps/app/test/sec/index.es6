import './style'
import template from './template'

export default {

	template,

	methods: {

		test() {

			this.$http('/app/login')
		}
	}
}