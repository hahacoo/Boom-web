/**
 * 辅助操作区域
 * 1.快速返回顶部
 * 2.快捷跳转面板
 *
 * by zhangdi
 */
import template from './view'

export default {

	template,

	methods: {

		/**
		 * 打开快捷操作面板
		 * @return {[type]} [description]
		 */
		showSide() {

			this.$publish('sidenav.open')
		},

		/**
		 * 快速返回页面顶部
		 * @return {[type]}    [description]
		 */
		backTop() {

			let container = document.getElementById('content-main'),
				minTop = 0, //距离顶部的最小距离
				interval = 10, //时间间隔
				distance = 50 //每次滚动的距离

			let _backTop = () => {

				clearTimeout(this.timeout)
				this.timeout = null

				if(container.scrollTop == 0) {

					return false
				}

				let _top = container.scrollTop - distance

				container.scrollTop = _top < minTop ? minTop : _top

				this.timeout = setTimeout(_backTop, 10)
			}

			_backTop()
		}
	},

	beforeDestroy() {

		this.timeout && clearTimeout(this.timeout)
	}
}