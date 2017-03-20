import { mapState, mapActions } from 'vuex'
import './style'
import template from './view'
import menuList from './list/index'

let data = [{
				url: 'important',
				text: '重保单位',
				children: []
			}, {
				url: 'user',
				text: '用户管理',
				children: []
			}, {
				url: 'expand',
				text: '重保单位',
				children: [{
					url: 'third111',
					text: '三级菜单111',
					children: []
				}, {
					url: 'third222',
					text: '三级菜单222',
					children: []
				}]
			}]

export default {

	template,

	data(){
		return {
			menuData: data
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