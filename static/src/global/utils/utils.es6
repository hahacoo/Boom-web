/**
 * 工具库
 *
 * by zhangdi
 */

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

	pathJoin
}