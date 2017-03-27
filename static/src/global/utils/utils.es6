/**
 * 工具库
 *
 * by zhangdi
 */

/**
 * 类数组对象转为数组
 * @param  {[type]} list  [description]
 * @param  {[type]} start [description]
 * @return {[type]}       [description]
 */
function toArray (list, start) {

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

export {

	pathJoin,
	toNumber,
	toArray
}