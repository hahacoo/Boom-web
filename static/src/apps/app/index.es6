/**
 * 内容区组件
 * 二级路由入口
 *
 * by hahacoo
 */
import { mapState, mapActions } from 'vuex'

import appHeader from './components/header'

let template = 
`<div class="boom-container">
	<!--头部区域-->
	<app-header></app-header>
	<!--主视图区域-->
	<transition name="boom-fade" mode="out-in" appear>
		<router-view></router-view>
	</transition>
	<!--提示区域-->
	<boom-notice></boom-notice>
</div>`

export default {

	template,

	computed: {

		...mapState({

			theme: state => state.theme
		})
	},

	components: {

		appHeader
	}
}
