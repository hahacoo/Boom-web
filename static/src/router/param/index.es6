import CryptoJS from 'crypto-js'

import { BOOM_ROUTE_SEC } from 'constant'

let serialize = JSON.stringify,
	deserialize = JSON.parse

let param

/**
 * 前置参数解析
 * @param  {[type]} to    [description]
 * @param  {[type]} from  [description]
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */
export function before(to, from, store) {

	let rq = to.query.rq

	if(rq) {

		try {

			let bytes = CryptoJS.AES.decrypt(rq, BOOM_ROUTE_SEC)

			param = deserialize(bytes.toString(CryptoJS.enc.Utf8))

		} catch(e) {

			//TODO 解析错误
		}
	} else {

		param = {}
	}
}

/**
 * 后置参数加密
 * @param  {[type]}   to   [description]
 * @param  {[type]}   from [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export function after(to, from, next) {

}

/**
 * 设置param
 * @param {[type]} id    [description]
 * @param {[type]} param [description]
 */
export function setParam(id, data) {

	let uid = this._uid

	if(!param[uid]) {

		param[uid] = {}
	}

	param[uid][id] = data

	let curRoutePath = this.$router.currentRoute.path

	// this.$router.replace({

	// 	path: curRoutePath,
	// 	query: {

	// 		rq: CryptoJS.AES.encrypt(serialize(param), BOOM_ROUTE_SEC).toString()
	// 	}
	// })
}

/**
 * 获取组件参数
 * @return {[type]} [description]
 */
export function getParam() {

	let uid = this._uid

	return param[uid]
}