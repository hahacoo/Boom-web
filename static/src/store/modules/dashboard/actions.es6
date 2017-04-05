import * as types from 'store/types'

export const addPortal = function({ commit }, portalId) {

	commit(types.DASHBOARD_ADD, portalId)
}
