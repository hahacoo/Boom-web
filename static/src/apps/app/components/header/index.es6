/**
 * 头部组件
 *
 * by hahacoo
 */
import { mapState, mapActions } from 'vuex'

import { 

	BOOM_THEME_DEFAULT, 
	BOOM_THEME_DARK, 
	BOOM_THEME_LIGHT, 
	BOOM_LOCALE_CN, 
	BOOM_LOCALE_EN 
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
			
			let themes = [ BOOM_THEME_DEFAULT, BOOM_THEME_DARK ]
			
			this.updateTheme(themes.filter(item => item !== this.theme)[0])
		},

		toggleLocale() {

			let locales = [ BOOM_LOCALE_CN, BOOM_LOCALE_EN ]

			this.updateLocale(locales.filter(item => item !== this.locale)[0])
		},

		goHome() {

			this.$router.push({

				path: '/'
			})
		},

		search() {

			this.$publish('search.open')
		}
	}
}

