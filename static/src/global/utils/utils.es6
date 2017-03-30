/**
 * 工具库
 *
 * by zhangdi
 */
import 'utils/classList'

/**
 * 是否在浏览器环境
 * @return {[type]} [description]
 */
function inBrowser() {

	return typeof window !== 'undefined' &&
		Object.prototype.toString.call(window) !== '[object Object]'
}

/**
 * 检测浏览器版本
 * @return {[type]} [description]
 */
function browserIs() {

	let browser = {}

	if(!inBrowser) {

		return browser
	}

	let nav = navigator.userAgent.toLowerCase()

	let result

	(result = nav.match(/rv:([\d.]+)\) like gecko/)) ? browser.ie = result[1] :
	(result = nav.match(/msie ([\d.]+)/)) ? browser.ie = result[1] :
    (result = nav.match(/firefox\/([\d.]+)/)) ? browser.firefox = result[1] :
    (result = nav.match(/chrome\/([\d.]+)/)) ? browser.chrome = result[1] :
    (result = nav.match(/opera.([\d.]+)/)) ? browser.opera = result[1] :
    (result = nav.match(/version\/([\d.]+).*safari/)) ? browser.safari = result[1] : 0

	return browser
}

/**
 * 类数组对象转为数组
 * @param  {[type]} list  [description]
 * @param  {[type]} start [description]
 * @return {[type]}       [description]
 */
function toArray(list, start) {

	start = start || 0
	let i = list.length - start,
		ret = new Array(i)

	while (i--) {
		ret[i] = list[i + start]
	}

	return ret
}

/**
 * 转数字类型
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function toNumber (value) {

	if (typeof value !== 'string') {

		return value
	} 

	let parsed = Number(value)

	return isNaN(parsed)
		? value
		: parsed
}

/**
 * 判断是对象、数组、字符串否存在指定值
 * @param  {[type]} val    [description]
 * @param  {[type]} search [description]
 * @return {[type]}        [description]
 */
function contains (val, search) {

	let i

	if (_.isPlainObject(val)) {

		let keys = Object.keys(val)

		i = keys.length

		while (i--) {

			if (contains(val[keys[i]], search)) {

				return true
			}
		}
	} else if (_.isArray(val)) {

		i = val.length

		while (i--) {

			if (contains(val[i], search)) {

				return true
			}
		}
	} else if (val !== null) {

		return val.toString().toLowerCase().indexOf(search) > -1
	}
}

/**
 * 地址路径拼接函数
 * @param  {...[type]} paths [description]
 * @return {[type]}          [description]
 */
function pathJoin(...paths) {

	let separator = '/',
		regexp = /^\/|\/$/g

	return paths.reduce((url, path) => {

		return url + separator + path.replace(regexp, '')
	}, '')
}

/**
 * 查找满足条件最近的父组件
 * @param  {[type]} $parent  [description]
 * @param  {[type]} cssClass [description]
 * @return {[type]}          [description]
 */
function getClosestVueParent($parent, cssClass) {

	if (!$parent || !$parent.$el) {

		return false
	}

	if ($parent._uid === 0) {

		return false
	}

	if ($parent.$el.classList.contains(cssClass)) {

		return $parent
	}

	return getClosestVueParent($parent.$parent, cssClass)
}

export {

	inBrowser,
	browserIs,
	pathJoin,
	toNumber,
	toArray,
	getClosestVueParent
}