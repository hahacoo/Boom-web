import * as actions from './actions'
import * as getters from './getters'
import * as types from 'store/types'

const state = {

	count: 0,
	portalId: '',
}

const mutations = {

	[types.DASHBOARD_ADD] (state, portalId) {

		state.count++
		state.portalId = portalId
	}
}

export default {

	state,
	mutations,
	actions,
	getters
}