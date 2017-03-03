/**
 * 内容区组件
 * 二级路由入口
 *
 * by zhangdi
 */
import { mapGetters } from 'vuex'

import './style'
import template from './view'
import appHeader from 'components/header'

export default {

	template,

	props: {

		app: {

			type: String,
			default: 'home'
		}
	},

	computed: {

		...mapGetters({

			theme: 'themeGetter'
		})
	},

	components: {

		appHeader
	}
}