/**
 * 可拖动窗体
 *
 * by zhangdi
 */
import './style'
import template from './view'
import draggable from './draggable'
import pullable from './pullable'

export default {

	template,

	props: {

		initTop: {

			type: [ Number, String ],
			default: 0
		},

		initLeft: {

			type: [ Number, String ],
			default: 0
		},

		initWidth: {

			type: [ Number, String ],
			default: 400
		},

		initHeight: {

			type: [ Number, String ],
			default: 400
		},

		minWidth: {

			type: Number,
			default: 400
		},

		fixHeight: [ Number, String ]
	},

	computed: {

		initStyle() {

			let suffix = 'px',
				height = '400px',
				width = String(this.initWidth),
				top = String(this.initTop),
				left = String(this.initLeft)

			if(this.fixHeight === '') {

				return {

					height: height,
					width: width.slice(-1) == '%' ? width :  width + suffix,
					top: top.slice(-1) == '%' ? top :  top + suffix,
					left: left.slice(-1) == '%' ? left :  left + suffix
				}
			}

			return {

				height: this.initHeight + 'px',
				width: width.slice(-1) == '%' ? width :  width + suffix,
				top: top.slice(-1) == '%' ? top :  top + suffix,
				left: left.slice(-1) == '%' ? left :  left + suffix
			}
		}
	},

	filters: {

		toPixel(val) {

			let suffix = 'px'

			val = String(val)

			if(val.slice(-2) == suffix) {

				return val
			}

			return val + suffix
		}
	},

	methods: {

		drag(event) {

            if(event.which === 1) {

                let elementToDrag = this.$el

                //注册拖动事件
                draggable(elementToDrag, event, null, (e, top, left) => {

					this.$emit('move', top, left)
                })
            }
		},

		pull(event, direction) {

			if(event.which === 1) {

				let elementToPull = null,
					dialog = this.$el

				let height = dialog.offsetHeight,
					width = dialog.offsetWidth,
					top = dialog.offsetTop,
					left = dialog.offsetLeft

				let minHeight = 30,
					minWidth = this.minWidth

				let noty = () => {

					let reWidth = +dialog.style.width.slice(0, -2),
						reHeight = +dialog.style.height.slice(0, -2),
						reLeft = +dialog.style.left.slice(0, -2),
						reTop = +dialog.style.top.slice(0, -2)

					this.$emit('resize', reWidth, reHeight, reLeft, reTop)
				}

				switch(direction) {

					case 'top':

						elementToPull = this.$refs.pulltop
						pullable(elementToPull, event, function(moveX, moveY) {

							//获取位置数值
							let cssHeight = height - moveY

							if(cssHeight >= minHeight) {
								dialog.style.top =  top + moveY + 'px'
								dialog.style.height =  cssHeight + 'px'
							}

						}, noty)
						break
					case 'right':

						elementToPull = this.$refs.pullright
						pullable(elementToPull, event, function(moveX, moveY) {

							//获取位置数值
							let cssWidth = width + moveX

							dialog.style.width =  (cssWidth < minWidth ? minWidth : cssWidth) + 'px'
						}, noty)
						break
					case 'bottom':

						elementToPull = this.$refs.pullbottom
						pullable(elementToPull, event, function(moveX, moveY) {

							//获取位置数值
							let cssHeight = height + moveY

							dialog.style.height =  (cssHeight < minHeight ? minHeight : cssHeight) + 'px'
						}, noty)
						break
					case 'left':

						elementToPull = this.$refs.pullleft
						pullable(elementToPull, event, function(moveX, moveY) {

							//获取位置数值
							let cssWidth = width - moveX

							if(cssWidth >= minWidth) {
								dialog.style.left =  left + moveX + 'px'
								dialog.style.width =  cssWidth + 'px'
							}
						}, noty)
						break
					case 'corner':

						elementToPull = this.$refs.pullcorner
						pullable(elementToPull, event, function(moveX, moveY) {
							//获取位置数值
							let cssHeight = height + moveY,
								cssWidth = width + moveX

							dialog.style.width =  (cssWidth < minWidth ? minWidth : cssWidth) + 'px'
							dialog.style.height =  (cssHeight < minHeight ? minHeight : cssHeight) + 'px'
						}, noty)
						break
				}

			}
		}
	}
}
