import * as types from 'store/types'
import { STI_THEME_DEFAULT, STI_THEME_DARK, STI_THEME_DASHBORD } from 'constant'

export const updateTheme = function({commit}, theme) {

	let themes = [ STI_THEME_DEFAULT, STI_THEME_DARK, STI_THEME_DASHBORD ]

	theme = themes.some((item) => item === theme) ? theme : STI_THEME_DEFAULT

	commit(types.THEME_UPDATE, theme)
}