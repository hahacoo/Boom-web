/**
 * 内容区组件
 * 二级路由入口
 *
 * by zhangdi
 */
import { mapState, mapActions } from 'vuex'

import { STI_THEME_DEFAULT } from 'constant'
import appHeader from './header'

let template = `
<div class="sti-container" :class="theme">
	
	<!--头部区域-->
	<app-header></app-header>
	<!--主视图区域-->
	<transition name="sti-fade" mode="out-in" appear>
		
		<router-view></router-view>
	</transition>

	<sti-notice></sti-notice>

	<footer class="sti-footer">
		
		{{$t('commons.footer')}}
	</footer>	
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