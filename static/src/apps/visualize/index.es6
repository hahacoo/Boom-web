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

		<router-view></router-view>
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
