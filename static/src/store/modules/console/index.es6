import * as actions from './actions'
import * as getters from './getters'
import * as types from 'store/types'

const state = {

	logs: {

		route: [],
		http: []
	}
}

const mutations = {

	[types.CONSOLE_UPDATE](state, {

		log,
		type
	}) {

		switch(type) {

			case 'route':

				state.logs.route.push(log)
				break
			case 'http':

				state.logs.http.push(log)
				break
			default:

				state.logs.route.push(log)
		}
		
	},

	[types.CONSOLE_EMPTY](state, type) {

		switch(type) {

			case 'route':

				state.logs.route = []
				break
			case 'http':

				state.logs.http = []
				break
			default:

				state.logs.route = []
		}
	}
}

export default {

	state,
	mutations,
	actions,
	getters
}