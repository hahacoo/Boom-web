import './style'
import template from './view'

export default {

	template,

	methods: {

		click() {

			this.$router.push({

				path: '/test/ace'
			})
		}
	}
}