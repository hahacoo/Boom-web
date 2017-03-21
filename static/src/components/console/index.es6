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

			this.$http.setItem('console-label', label)
		},

		resize(w, h) {

			this.$http.setItem('console-width', w)
			this.$http.setItem('console-height', h)
		},

		move(t, l) {

			this.$http.setItem('console-top', t)
			this.$http.setItem('console-left', l)
		},

		init() {

			this.active = this.$http.getItem('console-active')
			this.activeLable = this.$http.getItem('console-label')
			this.initWidth = this.$http.getItem('console-width') || 400
			this.initHeight = this.$http.getItem('console-height') || 400
			this.initTop = this.$http.getItem('console-top') || 200
			this.initLeft = this.$http.getItem('console-left') || 200
		}
	},

	mounted() {

		let that = this

		this.init()

		document.body.addEventListener('keydown', function(e) {

			if(e.ctrlKey && e.keyCode == that.keyCode) {

				that.active = !that.active

				that.$http.setItem('console-active', that.active)

				if(that.active) {

					that.init()
				}
			}
		})
	}
}