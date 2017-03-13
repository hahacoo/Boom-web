/**
 * 日志记录
 * @param {String} options.prefix      [description]
 * @param {[type]} options.labelStyle  [description]
 * @param {[type]} options.normalStyle [description]
 */
function Logger({

	prefix = '[sti-web]',
	labelStyle = `
			color: green;
			font-weight: bold
			`,
	normalStyle = `
			color: #000;
			`
} = {}) {

	this.prefix = `%c${prefix} %c`
	this.labelStyle = labelStyle
	this.normalStyle = normalStyle
}

Logger.prototype.say = function(content) {

	if(process.env.NODE_ENV !== 'product') {

		//开发模式下输出操作信息
		console.log(this.prefix + content, this.labelStyle, this.normalStyle)
	}
}

Logger.prototype.from = function(content) {

	let prefix = '操作前:'

	this.say(prefix + content.toString())
}

Logger.prototype.to = function(content) {

	let prefix = '操作后:'

	this.say(prefix + content.toString())
}

Logger.prototype.time = function() {

	let prefix = '操作时间:'

	this.say(prefix + new Date().toLocaleString())
}

export default Logger

