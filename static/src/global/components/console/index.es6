/**
 * 控制台调试组件
 * 记录一些关键信息
 *
 * by zhangdi
 */
import { mapGetters } from 'vuex'

import './style'
import template from './view'
 
export default {

	template,

	data() {

		return {

			active: false,
			initWidth: null,
			initHeight: null,
			initTop: null,
			initLeft: null 
		}
	},

	props: {

		keyCode: {

			default: 192
		}
	},

	computed: {

		...mapGetters({

			routes: 'routeLogsGetter',
			https: 'httpLogsGetter'
		})
	},

	methods: {

		change(label) {

			http.setItem('console-label', label)
		},

		resize(w, h, l, t) {

			http.setItem('console-width', w)
			http.setItem('console-height', h)
			http.setItem('console-left', l)
			http.setItem('console-top', t)
		},

		move(t, l) {

			http.setItem('console-top', t)
			http.setItem('console-left', l)
		},

		init() {

			this.active = http.getItem('console-active')
			this.activeLable = http.getItem('console-label')
			this.initWidth = http.getItem('console-width') || 400
			this.initHeight = http.getItem('console-height') || 400
			this.initTop = http.getItem('console-top') || 200
			this.initLeft = http.getItem('console-left') || 200
		}
	},

	mounted() {

		let that = this

		this.init()

		document.body.addEventListener('keydown', function(e) {

			if(e.ctrlKey && e.keyCode == that.keyCode) {

				that.active = !that.active

				http.setItem('console-active', that.active)

				if(that.active) {

					that.init()
				}
			}
		})
	}
}