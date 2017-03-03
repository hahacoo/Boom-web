import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from 'components/main'
import ErrorPage from 'components/error'
import Home from 'components/home'
import filters from './filters'
import routes from './routes'

Vue.use(VueRouter)

/**
 * 为app设置默认视图
 * @param  {[type]} apps [description]
 * @return {[type]}      [description]
 */
function buildApps(apps) {

	let i = 0,
		appNums = apps.length

	for(; i < appNums; i++) {

		let app = apps[i],
			children = app.children,
			assigned = false //指定默认页状态位

		let j = 0,
			menuNums = children.length

		//只遍历一级菜单
		for(; j < menuNums; j++) {

			let menu = children[j]

			if(menu.homePage) {

				assigned = true
				children.unshift({

					...menu,
					path: ''
				})

				break
			}
		}

		if(!assigned) {

			//未指定，则第一个菜单为默认页
			children.unshift({

				...children[0],
				path: ''
			})
		}
	}

	return apps
}

let baseUrl = '/ngsoc',
	router = new VueRouter({

	mode: 'history',
	routes: [
		//app访问路由，需要登录、认证
		{
			path: baseUrl,
			component: Main,
			children: [
				{
					path: '',
					component: Home
				},
				...buildApps(routes.apps)
			]
		},
		//公共页面路由，无需登录、认证
		{
			path: baseUrl + '/public',
			component: resolve => require(['apps/public'], resolve)
		},
		//错误页面
		{
			path: '*',
			component: ErrorPage
		}
	]
})

export default router

