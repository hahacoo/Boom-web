/**
 * 内容区组件
 * 二级路由入口
 *
 * by zhangdi
 */
import { mapState, mapActions } from 'vuex'

import { STI_THEME_DEFAULT } from 'constant'
import appHeader from './components/header'

let template = `
<div class="sti-container" :class="theme">
	<!--头部区域-->
	<app-header></app-header>
	<!--主视图区域-->
	<transition name="sti-fade" mode="out-in" appear>
		<router-view></router-view>
	</transition>
	<!--提示区域-->
	<sti-notice></sti-notice>
</div>
`

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
