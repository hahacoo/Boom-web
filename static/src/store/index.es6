/**
 * vuex入口文件
 * 1.配置平台状态(如登录状态，用户信息)，此类状态在所有组件中均可以获取
 * 2.管理各模块状态，针对各app管理的状态信息
 *
 * by hahacoo
 */
import Vue from 'vue'
import Vuex from 'vuex'

import { 
	
	BOOM_LOCALE_CN, 
	BOOM_LOCALE_EN, 
	BOOM_THEME_DEFAULT, 
	BOOM_THEME_DARK, 
	BOOM_THEME_DASHBORD 
} from 'constant'
import * as types from './types'
import storage from './plugins/storage'
import logs from './modules/console' 
import dashboard from './modules/dashboard' 

Vue.use(Vuex)

//平台级状态集合
const state = {	

	isLogin: true, //登录状态
	user: {

		name: 'admin',
		roles: [],
		org: 'BOOM-WEB'
	}, //用户信息
	menu: true, //菜单状态
	locale: BOOM_LOCALE_CN, //国际化信息
	theme: BOOM_THEME_DEFAULT //主题信息
}

const mutations = {

	[types.LOGIN_UPDATE](state, loginState) {

		state.isLogin = loginState
	},
	[types.USER_UPDATE](state, user) {

		state.user = user
	},
	[types.MENU_UPDATE](state, unfold) {

		state.menu = unfold
	},
	[types.LOCALE_UPDATE](state, locale) {

		state.locale = locale
	},
	[types.THEME_UPDATE](state, theme) {
		
		state.theme = theme
	}
}

const getters = {}

const actions = {

	updateLogin: ({commit}, loginState) => {

		commit(types.LOGIN_UPDATE, loginState)
	},
	updateUser: ({commit}, user) => {

		commit(types.USER_UPDATE, user)
	},
	updateMenu: ({commit}, unfold) => {

		commit(types.MENU_UPDATE, unfold)
	},
	updateLocale: ({commit}, locale) => {

		let locales = [ BOOM_LOCALE_CN, BOOM_LOCALE_EN ]

		locale = locales.some((item) => item === locale) 
			? locale 
			: BOOM_LOCALE_CN
			
		commit(types.LOCALE_UPDATE, locale)
	},
	updateTheme: ({commit}, theme) => {

		let themes = [ BOOM_THEME_DEFAULT, BOOM_THEME_DARK, BOOM_THEME_DASHBORD ]

		theme = themes.some((item) => item === theme) 
			? theme 
			: BOOM_THEME_DEFAULT

		commit(types.THEME_UPDATE, theme)
	}
}

export default new Vuex.Store({

	state,
	mutations,
	getters,
	actions,
	modules: {

		logs,
		dashboard
	},
	plugins: [storage({

		persistence: [ 'menu', 'theme', 'locale' ]
	})],
	strict: process.env.NODE_ENV !== 'production'
})

