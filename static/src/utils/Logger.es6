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

	this.prefix = `%c${prefix} %c'`

	this.labelStyle = labelStyle
	this.normalStyle = normalStyle
}

Logger.prototype.say = function(content) {

	console.log(this.prefix + content, this.labelStyle, this.normalStyle)
}

Logger.prototype.from = function(content) {

	let prefix = '操作前:'

	console.log(this.prefix + prefix + content.toString(), 
		this.labelStyle, this.normalStyle)
}

Logger.prototype.to = function(content) {

	let prefix = '操作后:'

	console.log(this.prefix + prefix + content.toString(), 
		this.labelStyle, this.normalStyle)
}

Logger.prototype.component = function(chain) {

	let content = '模块链信息:'

	console.log(this.prefix + content, this.labelStyle, this.normalStyle)

	console.table(chain, [ 'path', 'name' ])
}

Logger.prototype.time = function() {

	let content = '操作时间:'

	console.log(this.prefix + content + new Date().toLocaleString(), 
		this.labelStyle, this.normalStyle)
}

export default Logger

