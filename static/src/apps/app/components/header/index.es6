/**
 * 头部组件
 *
 * by zhangdi
 */
import { mapState, mapActions } from 'vuex'

import { 

	STI_THEME_DEFAULT, 
	STI_THEME_DARK, 
	STI_THEME_LIGHT, 
	STI_LOCALE_CN, 
	STI_LOCALE_EN 
} from 'constant'
import './style'
import template from './view'
import stiIcon from 'components/icon'

export default {

	template,

	components: {

		stiIcon
	},

	computed: {

		...mapState({

			locale: state => state.locale,
			theme: state => state.theme,
		})
	},

	methods: {

		...mapActions({

			updateTheme: 'updateTheme',
			updateLocale: 'updateLocale'
		}),

		toggleTheme() {
			
			let themes = [ STI_THEME_DEFAULT, STI_THEME_DARK ]
			
			this.updateTheme(themes.filter(item => item !== this.theme)[0])
		},

		toggleLocale() {

			let locales = [ STI_LOCALE_CN, STI_LOCALE_EN ]

			this.updateLocale(locales.filter(item => item !== this.locale)[0])
		},

		goHome() {

			this.$router.push({

				path: '/'
			})
		}
	}
}

