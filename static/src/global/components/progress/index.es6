import './style'
import template from './view'

let states = {

	PROGRESS: 'progressing',
	STOP: 'stop'
}

function ProgressBar({

	timeout,
	intervals,
	waitProgress
},	startCb = () => void(0),
	progressCb = () => void(0),
	stopCb = () => void(0),
	timeoutCb = () => void(0),
	cancleCb = () => void(0)
) {

	this.startCb = startCb
	this.progressCb = progressCb
	this.stopCb = stopCb
	this.cancleCb = cancleCb
	this.timeoutCb = timeoutCb
	this.intervals = intervals
	this.timeout = timeout
	this.waitProgress = waitProgress

	this.startRange = 30
}

ProgressBar.prototype.start = function() {

	if(_.isArray(this.waitProgress)) {

		let len = this.waitProgress.length

		this.waitProgress = this.waitProgress[Math.floor(Math.random() * len)]
	}

	this.startCb()
	this.progress()
	this.complateTimer = setTimeout(() => {

		this.timeoutCb()
	}, this.timeout)
}

ProgressBar.prototype.progress = function() {

	clearTimeout(this.goTimer)

	this.goTimer = null

	let intervals = this.intervals,
		len = intervals.length

	let result = this.progressCb()

	if(result <= this.startRange) {

		this.goTimer = setTimeout(() => {

			this.progress()
		}, 40)
	} else if(result < this.waitProgress && result > this.startRange) {

		this.goTimer = setTimeout(() => {

			this.progress()
		}, intervals[Math.floor(Math.random() * len)])
	}
}

ProgressBar.prototype.stop = function() {

	clearTimeout(this.goTimer)
	clearTimeout(this.complateTimer)

	this.goTimer = null
	this.complateTimer = null
	this.stopCb()

	return this
}

ProgressBar.prototype.cancle = function() {

	clearTimeout(this.goTimer)
	clearTimeout(this.complateTimer)

	this.goTimer = null
	this.complateTimer = null

	this.cancleCb()

	return this
}

export default {

	template,

	data() {

		return {

			progress: 0,
			show: false
		}
	},

	props: {

		top: {

			type: [ String, Number ],
			default: 50
		},

		//进度条颜色
		color: {

			type: String,
			default: '#263238'
		},

		intervals: {

			type: [ Array, Number ],
			default() {

				return [ 60, 80, 100 ]
			}
		},

		//每秒增加的长度
		ticks: {

			type: [ Array, Number ],
			default() {

				return [ 2, 4, 8 ]
			}
		},

		//等待时进度调位置
		waitProgress: {

			type: [ Array, Number ],
			default() {

				return [ 75, 80, 85, 90 ]
			}
		},

		//超时时间(毫秒)
		timeout: {

			type: Number,
			default: 10000
		}
	},

	computed: {

		barStyle() {

			return {

				width: this.progress + '%',
				backgroundColor: this.color
			}
		}
	},

	watch: {

		$route(to) {

			this.start()
		}
	},

	methods: {

		start() {

			if(!this.progressBar) {

				let waitProgress = this.waitProgress

				if(_.isArray(waitProgress)) {

					let len = waitProgress.length

					waitProgress = waitProgress[Math.floor(Math.random() * len)]
				}

				this.progressBar = new ProgressBar({

					timeout: this.timeout,
					intervals: this.intervals,
					waitProgress: this.waitProgress
				}, 	() => {

						this.show = true
						this.progress = 0
					},

					() => {
						
						this.state = states.PROGRESS

						let ticks = this.ticks

						if(_.isArray(ticks)) {

							let len = ticks.length

							ticks = ticks[Math.floor(Math.random() * len)]
						}

						this.progress += this.progress < 30 ? .3 : ticks

						return this.progress

					},

					() => {

						this.progress = 100
						this.state = states.STOP

						setTimeout(() => {

							this.show = false
						}, 1000)
					},

					() => {

						this.progress = 100
						this.state = states.STOP

						setTimeout(() => {

							this.show = false
						}, 1000)
					},

					() => {

						this.show = false
						this.progress = 0
						this.state = states.STOP
					}
				)

			}

			if(this.state === states.PROGRESS) {

				this.progressBar.cancle()

				this.$nextTick(() => {

					this.progressBar.start()
				})
			} else {

				this.progressBar.start()
			}

		},

		stop() {

			this.progressBar && this.progressBar.stop()
		}
	},

	created() {

		this.state = states.STOP

		this.$on('progress.start', () => {

			this.start()
		})

		this.$on('progress.stop', () => {

			this.stop()
		})
	}
}

