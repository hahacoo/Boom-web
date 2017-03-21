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

			active: false
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

	mounted() {

		let that = this

		this.active = JSON.parse(localStorage.getItem('sti-dev-console'))

		document.body.addEventListener('keydown', function(e) {

			if(e.ctrlKey && e.keyCode == that.keyCode) {

				that.active = !that.active

				localStorage.setItem('sti-dev-console', that.active)
			}
		})
	}
}