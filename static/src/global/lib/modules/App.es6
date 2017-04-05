/**
 * 小屏app
 */
import Vue from 'vue'
import { mapState } from 'vuex'

import appMenu from 'apps/app/components/menu'

function App(options) {

	if(options && options.template) {

		throw Error('请勿覆盖模板片段！')
	}

	let template = `

		<div class="sti-content">
			<!--菜单区域-->
			<app-menu></app-menu>
			<!--主视图区域-->
			<main id="content-main" class="content-main">
				<!--面包屑-->
				<div class="main-crumbs"></div>
				<transition name="sti-fadeInUp" mode="out-in" appear>
					<router-view></router-view>
				</transition>
			</main>
			<!--辅助区域-->
			<sti-assist />
			<!--侧边快捷面板-->
			<sti-sidenav ref="rightSidenav" />
		</div>
	`,
	basic = {

		computed: {

			...mapState({

				//为每个app注入登录信息、用户信息
				isLogin: state => state.isLogin,
				user: state => state.user
			})
		},

		template,

		components: {

			appMenu
		}
	}

	let _options = _.merge(

			basic,
			options
		)

	return Vue.extend(_options)
}

export default App

