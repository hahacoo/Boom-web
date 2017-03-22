/**
 * 工具库
 *
 * by zhangdi
 */
import { mapState, mapActions } from 'vuex'

import appMenu from 'components/menu'
import generateAppTemp from './templates/generateAppTemp'
import generateVisTemp from './templates/generateVisTemp'

let commons = {

	computed: {

		...mapState({

			//为每个app注入登录信息、用户信息
			isLogin: state => state.isLogin,
			user: state => state.user
		})
	}
}

/**
 * app创建函数
 * @param  {[type]} options 自定义参数，请勿覆盖template
 * @return {[type]}         [description]
 */
function createApp(options) {

	//通用属性
	let basic = {

		...commons,

		template: generateAppTemp(),

		components: {

			appMenu
		}
	}

	return	_.merge(

		basic,
		options
	)
}

/**
 * 大屏创建函数
 * TODO 未完成
 *
 * @return {[type]} [description]
 */
function createVisualize(template, options) {

	//通用属性
	let basic = {

		...commons,

		template: generateVisTemp(template)
	}

	return	_.merge(

		basic,
		options
	)
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

	createApp,
	createVisualize,
	pathJoin
}