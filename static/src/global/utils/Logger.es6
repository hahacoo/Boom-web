/**
 * 日志记录
 * @param {String} options.prefix      [description]
 * @param {[type]} options.labelStyle  [description]
 * @param {[type]} options.normalStyle [description]
 */
import {
	
	STI_BASEURL,
	STI_LOG_PREFIX,
	STI_LOG_ROUT_PREFIX,
	STI_LOG_HTTP_PREFIX,
	STI_LOG_PATH_PREFIX,
	STI_LOG_APP_PREFIX,
	STI_LOG_REQ_PREFIX,
	STI_LOG_RES_PREFIX,
	STI_LOG_ELA_PREFIX,
	STI_LOG_STA_PREFIX,
	STI_LOG_DTA_PREFIX
} from 'constant'

import Console from 'utils/Console'

class Logger {

	constructor({

		prefix = STI_LOG_PREFIX,
		labelStyle = `
				color: green;
				font-weight: bold
				`,
		normalStyle = `
				color: #000;
				`,
		output = console
	} = {}) {

		this.prefix = `%c${prefix} %c`
		this.labelStyle = labelStyle
		this.normalStyle = normalStyle
		this.output = output
	}

	log(content) {

		if(process.env.NODE_ENV !== 'product') {

			//开发模式下输出操作信息
			this.output.log(

				this.prefix + content.toString(), 
				this.labelStyle, 
				this.normalStyle
			)
		}
	}

	detail(obj, table) {

		if(process.env.NODE_ENV !== 'product') {

			//开发模式下输出操作信息
			this.output.log(

				this.prefix + STI_LOG_DTA_PREFIX, 
				this.labelStyle, 
				this.normalStyle
			)

			if(table) {

				this.output.table(obj)
			} else {

				this.output.dir(obj)
			}
			
		}
	}

}

/**
 * 路由日志
 */
class RouterLogger extends Logger {

	constructor({

		prefix = STI_LOG_ROUT_PREFIX,
		labelStyle = `
				color: green;
				font-weight: bold
				`,
		normalStyle = `
				color: #000;
				`,
		output = new Console('route')
	} = {}) {

		super({

			prefix,
			labelStyle,
			normalStyle,
			output
		})

		this.appPrefix = STI_LOG_APP_PREFIX
		this.pathPrefix = STI_LOG_PATH_PREFIX
	}

	/**
	 * 输出组件信息
	 * @param  {[type]} appName [description]
	 * @return {[type]}         [description]
	 */
	app(appName) {

		this.log(this.appPrefix + appName)
	}

	/**
	 * 输出地址信息
	 * @param  {[type]} path [description]
	 * @return {[type]}      [description]
	 */
	path(path) {

		this.log(this.pathPrefix + STI_BASEURL + path)
	}
}

/**
 * 请求日志
 */
class HttpLogger extends Logger {

	constructor({

		prefix = STI_LOG_HTTP_PREFIX,
		labelStyle = `
				color: green;
				font-weight: bold
				`,
		normalStyle = `
				color: #000;
				`,
		output = new Console('http')
	} = {}) {

		super({

			prefix,
			labelStyle,
			normalStyle,
			output
		})

		this.reqPrefix = STI_LOG_REQ_PREFIX
		this.resPrefix = STI_LOG_RES_PREFIX
		this.statePrefix = STI_LOG_STA_PREFIX
		this.elapsePrefix = STI_LOG_ELA_PREFIX
		this.start = +new Date()
	}

	/**
	 * 输出请求信息
	 * @param  {[type]} path [description]
	 * @return {[type]}      [description]
	 */
	request(path) {

		this.log(this.reqPrefix + path)
	}

	/**
	 * 输出返回数据信息
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	response(data) {

		this.detail(data)
	}

	/**
	 * 输出响应状态
	 * @param  {[type]} state [description]
	 * @return {[type]}       [description]
	 */
	state(state) {

		this.log(this.statePrefix + state)
	}

	/**
	 * 输出响应时间
	 * @return {[type]} [description]
	 */
	elapse() {

		let endTime = +new Date()

		this.log(this.elapsePrefix + (endTime - this.start) + 'ms' )
	}
}

export {

	Logger,
	RouterLogger,
	HttpLogger
}

