/**
 * 登录过滤器
 */
import { loadFilter } from 'router/BeforeChain'

loadFilter(function(to, from) {

	//to，跳转后的视图
	//from，跳转前的视图
	//
	//
	if(to.meta.requestAuth) {

		//需要校验登录状态
		if(!to.isLogin) {

			return	{
						
						path: '/login',
						query: { redirect: to.fullPath }
					}
		}
	}

	return true
})