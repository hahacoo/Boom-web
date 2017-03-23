import proxyAjax from './proxy'
import { STI_STORAGE } from 'constant'

let serialize = JSON.stringify,
	deserialize = JSON.parse,
	separator = '-'

let _csrfToken

function getToken() {

	return _csrfToken
}

//代理ajax操作，配置公共参数、注册公共回调函数
proxyAjax({

	param: {

		csrfToken: getToken()
	},

	alwaysHandler: function(data, state, xhr) {

	},
	successHandler: function(data, state, xhr) {

	},
	errorHandler: function(xhr, state, errorThrown) {

	}
})

let request = function(url, settings) {

	let promise = new Promise((resolve, reject) => {

		$.ajax(url, settings)
		.done(function(res) {

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
let http = function (url, settings) {

	let { data } = settings

	this.$setParam(url, data)

	return request(url, settings)
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

/**
 * 本地存储
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 */
http.setItem = function(key, value) {

	localStorage.setItem(STI_STORAGE + separator + key, serialize(value))
}

/**
 * [getItem description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
http.getItem = function(key) {

	return deserialize(localStorage.getItem(STI_STORAGE + separator + key))
}

/**
 * [remove description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
http.remove = function(key) {

	localStorage.removeItem(STI_STORAGE + separator + key)
}

export default http
