/**
 * vuex入口文件
 * 1.配置平台状态(如登录状态，用户信息)，此类状态在所有组件中均可以获取
 * 2.管理各模块状态，针对各app管理的状态信息
 *
 * by zhangdi
 */
import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './types'
import theme from './modules/theme'

Vue.use(Vuex)

//平台级状态集合
const state = {	

	isLogin: false, //登录状态
	user: {

		name: 'admin',
		roles: [],
		org: 'STI-WEB'
	} //用户信息
}

const mutations = {

	[types.LOGIN_UPDATE](state, loginState) {

		state.isLogin = loginState
	},
	[types.USER_UPDATE](state, user) {

		state.user = user
	}
}

const getters = {

	loginGetter: state => state.isLogin,
	userGetter: state => state.user
}

const actions = {

	updateLogin: ({commit}, loginState) => {

		commit(types.LOGIN_UPDATE, loginState)
	},
	updateUser: ({commit}, user) => {

		commit(types.USER_UPDATE, user)
	}
}

export default new Vuex.Store({

	state,
	mutations,
	getters,
	actions,
	modules: {

		theme
	},
	strict: process.env.NODE_ENV !== 'production'
})