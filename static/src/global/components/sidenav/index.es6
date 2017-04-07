/**
 * 快捷操作面板
 * 1.app快速切换
 *
 * by hahacoo
 */
import { mapState, mapActions } from 'vuex'

import './style'
import template from './view'
import { 

	BOOM_THEME_DEFAULT, 
	BOOM_THEME_DARK, 
	BOOM_THEME_LIGHT, 
	BOOM_LOCALE_CN, 
	BOOM_LOCALE_EN 
} from 'constant'

export default {

	template,

	data() {

		return {

			radio2: 1,

			langs: [

				{

					id: BOOM_LOCALE_CN,
				},
				{

					id: BOOM_LOCALE_EN,
				}
			],

			themes: [

				BOOM_THEME_DEFAULT, 
				BOOM_THEME_DARK
			]
		}
	},

	computed: {

		...mapState({

			locale: state => state.locale,
			vtheme: state => state.theme,
		})
	},

	methods: {

		...mapActions({

			updateTheme: 'updateTheme',
			updateLocale: 'updateLocale'
		}),

		nav(path) {

			this.$router.push(path)
		},

		clear() {

			http.clear()
			window.history.go(0)
		}
	},

	mounted() {

		this.$subscribe('sidenav.open', function() {

			this.$refs.sidenav && this.$refs.sidenav.toggle()
		})
	}
}