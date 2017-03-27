import './style'
import template from './view'
import ProgressBar from './ProgressBar'

export default {

	template,

	data() {

		return {

			progress: 0,
			show: false,
			color: '#263238'
		}
	},

	props: {

		top: {

			type: [ String, Number ],
			default: 50
		},

		//时间间隔集合
		intervals: {

			type: [ Array, Number ],
			default() {

				return [ 10, 10, 20, 20, 40 ]
			}
		},

		//每秒增加的长度
		ticks: {

			type: [ Array, Number ],
			default() {

				return [ 2, 4, 6 ]
			}
		},

		//等待时进度调位置
		waitProgress: {

			type: [ Array, Number ],
			default() {

				return [ 80, 85, 85, 85, 90, 90, 95, 95 ]
			}
		},

		//超时时间(毫秒)
		timeout: {

			type: Number,
			default: 4000
		}
	},

	computed: {

		barStyle() {

			return {

				width: this.progress + '%',
				background: this.color
			}
		}
	},

	watch: {

		$route(to) {

			let progress = to.meta.progress

			if(progress) {

				if(progress.color) {

					this.color = progress.color
				}

				this.start()
			} else {

				this.cancle()
			}
		}
	},

	methods: {

		start() {

			if(!this.progressBar) {

				this.progressBar = new ProgressBar({

					timeout: this.timeout,
					intervals: this.intervals,
					waitProgress: this.waitProgress,
					ticks: this.ticks
				}, 	() => {

						this.show = true
					},

					tick => {
						
						if(this.progress <= 10) {

							return this.progress += .2
						}

						if(this.progress > 50 && this.progress < 80) {

							return this.progress += .5
						}

						return this.progress += tick
					},

					() => {

						this.progress = 100
						this.showTimer = setTimeout(() => {

							this.show = false
						}, 1000)
					},

					() => {

						clearTimeout(this.showTimer)
						this.showTimer = null
						this.show = false
						this.progress = 0
					}
				)

			}

			this.progressBar.cancle()

			this.$nextTick(() => {

				this.progressBar.start()
			})
		},

		stop() {

			this.progressBar && this.progressBar.stop()
		},

		cancle() {

			this.progressBar && this.progressBar.cancle()
		}
	},

	created() {

		this.$subscribe('progress.start', () => {

			this.start()
		})

		this.$subscribe('progress.stop', () => {

			this.stop()
		})
	}
}

