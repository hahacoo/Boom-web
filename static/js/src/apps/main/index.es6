/**
 * 内容区组件
 * 二级路由入口
 *
 * by zhangdi
 */
import { mapGetters } from 'vuex'

import { createApp } from 'utils/StiBuilder'
import appHeader from 'components/header'

let template = `

<main class="sti-main" :class="theme">
	<!--头部区域-->
	<app-header></app-header>
	<!--app区域-->
	<router-view></router-view>
</main>
`

export default createApp({

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
})