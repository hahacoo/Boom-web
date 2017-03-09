import * as actions from './actions'
import * as getters from './getters'
import * as types from 'store/types'

const state = {

	curTheme: 'default'
}

const mutations = {

	[types.THEME_UPDATE](state, theme) {

		state.curTheme = theme
	}
}

export default {

	state,
	mutations,
	actions,
	getters
}