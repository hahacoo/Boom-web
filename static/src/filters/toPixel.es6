/**
 * 像素转换过滤器
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export default function toPixel(value) {

	let suffix = 'px'

		value = String(value)

	if(value.slice(-2) == suffix) {

		return value
	}

	return value + suffix
}