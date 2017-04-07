/**
 * 基于Vue-material主题配置文件
 * 
 */
import { BOOM_THEME_DEFAULT, BOOM_THEME_DARK, BOOM_THEME_DASHBORD } from 'constant'

export default {

	[BOOM_THEME_DEFAULT]: {

		primary: {

			color: 'teal',
			hue: 'A700',
		},
		accent: 'red',
		warn: 'red',
		background: {

			color: 'grey',
			hue: 100
		},
	},

	[BOOM_THEME_DARK]: {

		primary: 'black',
		accent: 'pink',
		warn: 'red',
		notice: 'yellow',
		background: {

			color: 'grey',
			hue: 100
		}
	},

	[BOOM_THEME_DASHBORD]: {

		primary: 'black',
		accent: 'pink',
		warn: 'red',
		background: {

			color: 'grey',
			hue: 100
		}
	}
}