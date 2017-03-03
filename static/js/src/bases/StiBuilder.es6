/**
 * 平台工具函数
 *
 * by zhangdi
 */
import template from './app_template'
import appMenu from 'components/menu'

/**
 * app创建函数
 * @param  {[type]} options 自定义参数，请勿覆盖template
 * @return {[type]}         [description]
 */
export const createApp = options => {

	return	{

		template,

		components: {
			
			appMenu
		},

		...options
	}
}