import * as actions from './actions'
import * as getters from './getters'
import * as types from 'store/types'

const state = {

	logs: []
}

const mutations = {

	[types.CONSOLE_UPDATE](state, log) {

		state.logs.push(log)
	},

	[types.CONSOLE_EMPTY](state) {

		state.logs = []
	}
}

export default {

	state,
	mutations,
	actions,
	getters
}