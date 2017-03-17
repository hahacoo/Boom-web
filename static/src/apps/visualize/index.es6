/**
 * 大屏入口
 *
 */
import { STI_THEME_DASHBORD } from 'constant'
import visHeader from './header'
import visBackground from './background'

let template = `
<div class="sti-container ${STI_THEME_DASHBORD}">
	<!--头部区域-->
	<vis-header v-if="visualize"></vis-header>
	<!--主视图区域-->
	<md-theme :md-name="theme">
		<transition :name="transitionName" mode="out-in" appear>
			<router-view></router-view>
		</transition>
	</md-theme>
	<!--背景区域-->
	<vis-background v-if="visualize"></vis-background>
</div>
`

export default {

	template,

	data() {

		return {

			visualize: false,
			transitionName: 'sti-fade',
			theme: STI_THEME_DASHBORD
		}
	},

	components: {

		visHeader,
		visBackground
	},

	beforeRouteEnter(to, from, next) {

		next(vm => {

			if(to.name === 'vhome') {

				vm.visualize = false
				vm.transitionName = 'sti-fade'

			} else {

				vm.visualize = true
				vm.transitionName = 'sti-zoom'
			}
		})
	}
}
