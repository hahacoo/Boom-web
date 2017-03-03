import * as types from 'store/types'

export const updateTheme = function({commit}, theme) {

	commit(types.THEME_UPDATE, theme)
}