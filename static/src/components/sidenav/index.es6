/**
 * 快捷操作面板
 * 1.app快速切换
 *
 * by zhangdi
 */
import './style'
import template from './view'

export default {

	template,

	methods: {

		nav(path) {

			this.$router.push(path)
		}
	},

	mounted() {

		this.$subscribe('sidenav.open', () => {

			this.$refs.sidenav.toggle()
		})
	}
}