/**
 * 平台工具函数
 *
 * by zhangdi
 */
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

import appMenu from 'components/menu'
import appTemplate from './templates/appTemplate'
import dashboardTemplate from './templates/dashboardTemplate'

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
export const createApp = options => {

	//通用属性
	let basic = {

		...commons,

		template: appTemplate,

		components: {
			
			appMenu,
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
export const createDashBoard = options => {

	//通用属性
	let basic = {

		...commons,

		template:dashboardTemplate
	}

	return	_.merge(

		basic, 
		options 
	)
}

/**
 * comp创建函数
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
export const createComp = options => {

	//通用属性
	let basic = {

		...commons
	}

	return	_.merge(

		basic, 
		options 
	)
}
