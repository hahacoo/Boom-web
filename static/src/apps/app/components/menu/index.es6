import { mapState, mapActions } from 'vuex'
import './style'
import template from './view'
import menuList from './list/index'

export default {

	template,

	data(){
		return {
		}
	},

	components:{
		menuList
	},

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