import * as types from 'store/types'

export const updateLogs = function({commit}, {
	log, 
	type = 'route'
}) {

	commit(types.CONSOLE_UPDATE, {

		log,
		type
	})
}

export const emptyLogs = function({commit}, type = 'route') {

	commit(types.CONSOLE_EMPTY, type)
}