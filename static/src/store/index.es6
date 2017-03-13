/**
 * vuex入口文件
 * 1.配置平台状态(如登录状态，用户信息)，此类状态在所有组件中均可以获取
 * 2.管理各模块状态，针对各app管理的状态信息
 *
 * by zhangdi
 */
import Vue from 'vue'
import Vuex from 'vuex'

import { 

	STI_LOCALE_ZH, 
	STI_LOCALE_EN, 
	STI_THEME_DEFAULT, 
	STI_THEME_DARK, 
	STI_THEME_DASHBORD 
} from 'constant'
import * as types from './types'
import storage from './plugins/storage'

Vue.use(Vuex)

//平台级状态集合
const state = {	

	isLogin: true, //登录状态
	user: {

		name: 'admin',
		roles: [],
		org: 'STI-WEB'
	}, //用户信息
	locale: STI_LOCALE_ZH, //国际化信息
	theme: STI_THEME_DEFAULT //主题信息
}

const mutations = {

	[types.LOGIN_UPDATE](state, loginState) {

		state.isLogin = loginState
	},
	[types.USER_UPDATE](state, user) {

		state.user = user
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
	updateLocale: ({commit}, locale) => {

		let locales = [ STI_LOCALE_ZH, STI_LOCALE_EN ]

		locale = locales.some((item) => item === locale) 
			? locale 
			: STI_LOCALE_ZH
			
		commit(types.LOCALE_UPDATE, locale)
	},
	updateTheme: ({commit}, theme) => {

		let themes = [ STI_THEME_DEFAULT, STI_THEME_DARK, STI_THEME_DASHBORD ]

		theme = themes.some((item) => item === theme) 
			? theme 
			: STI_THEME_DEFAULT

		commit(types.THEME_UPDATE, theme)
	}
}

export default new Vuex.Store({

	state,
	mutations,
	getters,
	actions,
	plugins: [storage({

		persistence: [ 'theme', 'locale' ]
	})],
	strict: process.env.NODE_ENV !== 'production'
})