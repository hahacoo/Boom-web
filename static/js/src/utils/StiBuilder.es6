/**
 * 平台工具函数
 *
 * by zhangdi
 */
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

import appMenu from 'components/menu'

let template =  `
<div class='sti-content'>

	<app-menu></app-menu>
	<router-view></router-view>
</div>
`
				
/**
 * app创建函数
 * @param  {[type]} options 自定义参数，请勿覆盖template
 * @return {[type]}         [description]
 */
export const createApp = options => {

	//通用属性
	let commons = {

		template,

		components: {
			
			appMenu
		},

		computed: {

			...mapGetters({

				//为每个app注入登录信息、用户信息
				isLogin: 'loginGetter', 
				userInfo: 'userGetter'
			})
		}
	}

	return	_.merge(

		commons, 
		options 
	)
}

