import * as types from 'store/types'

export const updateLogs = function({commit}, log) {

	commit(types.CONSOLE_UPDATE, log)
}

export const emptyLogs = function({commit}) {

	commit(types.CONSOLE_EMPTY)
}