function ProgressBar({

	timeout,
	intervals,
	waitProgress,
	ticks
},	startCb = () => void 0,
	progressCb = () => void 0,
	stopCb = () => void 0,
	cancleCb = () => void 0
) {

	this.startCb = startCb
	this.progressCb = progressCb
	this.stopCb = stopCb
	this.cancleCb = cancleCb
	this.intervals = intervals
	this.timeout = timeout
	this.waitProgress = waitProgress
	this.ticks = ticks

	this.startRange = 30
}

/**
 * 从数组中随机取值
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
ProgressBar.random = function(data) {

	if(_.isArray(data)) {

		let len = data.length

		return data[Math.floor(Math.random() * len)]
	}

	return data
}

/**
 * 加载进度条
 * @return {[type]} [description]
 */
ProgressBar.prototype.start = function() {

	let waitProgress = ProgressBar.random(this.waitProgress)

	//创建计时器，超时自动加载完成
	this.complateTimer = setTimeout(() => {

		this.stopCb()
	}, this.timeout)
	this.startCb()
	this.progress(waitProgress)
}

ProgressBar.prototype.progress = function(waitProgress) {

	clearTimeout(this.goTimer)
	this.goTimer = null

	let tick = ProgressBar.random(this.ticks)

	let result = this.progressCb(tick)

	if(result < waitProgress) {

		let interval = ProgressBar.random(this.intervals)

		this.goTimer = setTimeout(() => {

			this.progress(waitProgress)
		}, interval)
	}
}

/**
 * 进度条加载完成
 * @return {[type]} [description]
 */
ProgressBar.prototype.stop = function() {

	clearTimeout(this.goTimer)
	clearTimeout(this.complateTimer)

	this.goTimer = null
	this.complateTimer = null
	this.stopCb()
}

/**
 * 取消进度条加载
 * @return {[type]} [description]
 */
ProgressBar.prototype.cancle = function() {

	clearTimeout(this.goTimer)
	clearTimeout(this.complateTimer)

	this.goTimer = null
	this.complateTimer = null
	this.cancleCb()
}

export default ProgressBar

