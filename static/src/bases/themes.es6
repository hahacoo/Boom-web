/**
 * 基于Vue-material主题配置文件
 * 
 */
import { STI_THEME_DEFAULT, STI_THEME_DARK, STI_THEME_DASHBORD } from 'constant'

export default {

	[STI_THEME_DEFAULT]: {

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

	[STI_THEME_DARK]: {

		primary: 'black',
		accent: 'pink',
		warn: 'red',
		background: {

			color: 'grey',
			hue: 100
		}
	},

	[STI_THEME_DASHBORD]: {

		primary: 'black',
		accent: 'pink',
		warn: 'red',
		background: {

			color: 'grey',
			hue: 100
		}
	}
}