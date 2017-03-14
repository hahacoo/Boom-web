/**
 * 大屏入口
 *
 */
import { STI_THEME_DASHBORD } from 'constant'
import dbHeader from './header'
import dbBackground from './background'

let template = `
<div class="sti-container dashboard">

	<md-theme :md-name="theme">
<<<<<<< HEAD
		<db-background></db-background>
		<!--头部区域-->
		<db-header></db-header>
		<!--主视图区域-->
		<transition name="sti-zoom" mode="out-in" appear>
			<div class="sti-visualize">
				<router-view></router-view>
			</div>
		</transition>

=======

		<router-view></router-view>
>>>>>>> fbf3478feada4cbb9c32c1095f6e5713aea38a49
	</md-theme>

</div>
`

export default {

	template,

	components: {
		dbBackground,
		dbHeader
	},

	data() {

		return {

			theme: STI_THEME_DASHBORD
		}
	}
}
