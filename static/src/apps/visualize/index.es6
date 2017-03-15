/**
 * 大屏入口
 *
 */
import { STI_THEME_DASHBORD } from 'constant'

let template = `
<div class="sti-container ${STI_THEME_DASHBORD}">

	<md-theme :md-name="theme">

		<transition name="sti-fade" mode="out-in" appear>
		
			<router-view></router-view>
		</transition>
	</md-theme>
</div>
`

export default {

	template,
	
	data() {

		return {

			theme: STI_THEME_DASHBORD
		}
	}
}
