import { 

	toArray, 
	toNumber,
	contains
} from 'utils'

const digitsRE = /(\d{3})(?=\d)/g

/**
 * 'abc' => 'Abc'
 * 
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function capitalize(value) {

	if (!value && value !== 0) {

		return ''
	}

	value = value.toString()

	return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * 'abc' => 'ABC'
 * 
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function uppercase(value) {

	return (value || value === 0)
		? value.toString().toUpperCase()
		: ''
}

/**
 * 'AbC' => 'abc'
 * 
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function lowercase(value) {

	return (value || value === 0)
		? value.toString().toLowerCase()
		: ''
}

/**
 * 格式化json输出
 * 
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function json(value) {

	return JSON.stringify(value, null, 4)
}

/**
 * 12345 => $12,345.00
 * 
 * @param  {[type]} value    [description]
 * @param  {[type]} currency [description]
 * @return {[type]}          [description]
 */
function currency (value, currency) {

	value = parseFloat(value)

	if (!isFinite(value) || (!value && value !== 0)) {

		return ''
	}

	currency = currency !== null ? currency : '$'
	let stringified = Math.abs(value).toFixed(2)
	let _int = stringified.slice(0, -3)
	let i = _int.length % 3
	let head = i > 0
		? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
		: ''
	let _float = stringified.slice(-3)
	let sign = value < 0 ? '-' : ''

	return currency + sign + head +
		_int.slice(i).replace(digitsRE, '$1,') +
		_float
}

/**
 * 'item' => 'items'
 * 
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function pluralize(value) {

	let args = toArray(arguments, 1)

	return args.length > 1
		? (args[value % 10 - 1] || args[args.length - 1])
		: (args[0] + (value === 1 ? '' : 's'))
}

/**
 * [limitBy description]
 * 
 * @param  {[type]} arr    [description]
 * @param  {[type]} n      [description]
 * @param  {[type]} offset [description]
 * @return {[type]}        [description]
 */
function limitBy (arr, n, offset) {

  offset = offset ? parseInt(offset, 10) : 0
  n = toNumber(n)

  return typeof n === 'number'
	? arr.slice(offset, offset + n)
	: arr
}

/**
 * [filterBy description]
 * @param  {[type]} arr       [description]
 * @param  {[type]} search    [description]
 * @param  {[type]} delimiter [description]
 * @return {[type]}           [description]
 */
function filterBy (arr, search, delimiter) {

	arr = toArray(arr)

	if (search === null) {

		return arr
	}

	if (typeof search === 'function') {

		return arr.filter(search)
	}

	// cast to lowercase string
	search = ('' + search).toLowerCase()
	// allow optional `in` delimiter
	// because why not
	let n = delimiter === 'in' ? 3 : 2
	// extract and flatten keys
	let keys = toArray(arguments, n).reduce(function (prev, cur) {

		return prev.concat(cur)
	}, [])

	let res = []
	let item, key, val, j

	for (let i = 0, l = arr.length; i < l; i++) {
		item = arr[i]
		val = (item && item.$value) || item
		j = keys.length

		if (j) {

			while (j--) {

				key = keys[j]
				if (contains(val[key], search)) {

					res.push(item)
					break
				}
			}
		} else if (contains(item, search)) {

			res.push(item)
		}
	}

	return res
}

/**
 * 数组排序
 * @param  {[type]} arr     [description]
 * @param  {[type]} sortKey [description]
 * @param  {[type]} reverse [description]
 * @return {[type]}         [description]
 */
function orderBy (arr, sortKey, reverse) {

	arr = toArray(arr)

	if (!sortKey) {

		return arr
	}

	let order = (reverse && reverse < 0) ? -1 : 1

	// sort on a copy to avoid mutating original array
	return arr.slice().sort(function (a, b) {

		if (_.isObject(a) && '$value' in a) {

			a = a.$value
		}

		if (_.isObject(b) && '$value' in b) {

			b = b.$value
		} 

		return a === b ? 0 : a > b ? order : -order
	})
}

/**
 * 像素转换过滤器
 * 
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function toPixel(value) {

	let percent = '%',
		pixel = 'px'

	value = value.toString()

	if(value.slice(-1) == percent || value.slice(-2) == pixel) {

		return value
	}

	return value + pixel
}

/**
 * 高亮显示
 * 
 * @param  {[type]} value    [description]
 * @param  {[type]} reg      [description]
 * @param  {[type]} replacer [description]
 * @return {[type]}          [description]
 */
function highlight(value, reg, replacer) {

	let _value = value.toString()

	if(typeof replacer === 'function') {

		return _value.replace(reg, replacer)
	}

	return _value.replace(reg, '<b>$&</b>')
}

export {

	capitalize,
	uppercase,
	lowercase,
	currency,
	json,
	toPixel,
	highlight
}