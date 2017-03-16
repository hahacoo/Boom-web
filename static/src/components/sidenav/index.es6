import './style'
import template from './view'

export default {

	template,

	methods: {

		toggle() {

			this.$refs.sidenav.toggle()
		}
	}
}