/**
 * 大屏入口
 *
 */
import { STI_THEME_DASHBORD } from 'constant'
import visHeader from './components/header'
import visBackground from './components/background'

let template = `
<div class="sti-container ${STI_THEME_DASHBORD}">
	<!--头部区域-->
	<vis-header v-if="visualize"></vis-header>
	<!--主视图区域-->
	<transition :name="transitionName" mode="out-in" appear>
		<router-view></router-view>
	</transition>
	<!--背景区域-->
	<vis-background v-if="visualize"></vis-background>
</div>
`

export default {

	template,

	data() {

		return {

			visualize: false,
			transitionName: 'sti-fade'
		}
	},

	components: {

		visHeader,
		visBackground
	},

	watch: {

		'$route' (to, from) {

			this.beforeRouter(to)
		}
	},

	methods: {

		/**
		 * 动态设置动画效果
		 * 使用beforeRouteEnter会出现异常情况
		 * @param  {[type]} route [description]
		 * @return {[type]}       [description]
		 */
		beforeRouter(route) {

			if(route.name === 'vhome') {

				this.visualize = false
				this.transitionName = 'sti-fade'

			} else {

				this.visualize = true
				this.transitionName = 'sti-rotating'
			}
		}
	},

	created() {

		this.beforeRouter(this.$route)
	}
}
