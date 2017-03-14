import $ from 'jquery'

import proxyAjax from './proxy'
import Logger from 'utils/Logger'

let _csrfToken

function getToken() {

	return _csrfToken
}

//代理ajax操作，配置公共参数、注册回调函数
proxyAjax({

	param: {

		csrfToken: getToken()
	},

	alwaysHandler: res => {

		let logger = new Logger()

		logger.say('zhang')
	},
	successHandler: res => {

		let logger = new Logger()

		logger.say('success')
	},
	errorHandler: (xhr, state, errorThrown) => {

		let logger = new Logger()
	}
})

let request = function(...args) {

	let promise = new Promise((resolve, reject) => {

		$.ajax(...args)
		.done(res => {

			//TODO 平台数据处理逻辑
			resolve(res)

		})
	})

	return promise
}

/**
 * http工具函数
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
let http = function (...args) {

	return request(...args)
}

Object.defineProperty(http, 'csrfToken', {

	enumerable: false,
	configurable: false,
	get() {

		return getToken()
	}
})

/**
 * GET操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
http.get = function(...args) {

	let [ url, settings ] = args

	return request(url, {

				...settings,
				type: 'GET'
			})
}

/**
 * POST操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
http.post = function(...args) {

	let [ url, settings ] = args

	return request(url, {
		
				...settings,
				type: 'POST'
			})
}

/**
 * POSTJSON操作
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
http.postJson = function(...args) {

	let [ url, settings ] = args

	return request(url, {
		
				...settings,
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				dataType: 'json'
			})
}

export default http
