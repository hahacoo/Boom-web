import { mapState, mapActions } from 'vuex'
import './style'
import template from './view'

export default {

	template,

	computed: {

		...mapState({

			unfold: 'menu'
		}),

		icon() {

			return this.unfold ? 'angle-left' : 'angle-right'
		}
	},

	methods: {

		...mapActions({

			updateMenu: 'updateMenu'
		}),

		toggle() {

			this.updateMenu(!this.unfold)
		}
	}
}