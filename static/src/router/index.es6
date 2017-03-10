import Vue from 'vue'
import VueRouter from 'vue-router'
import CryptoJS from 'crypto-js'

import { STI_BASEURL } from 'constant'
import store from 'store/index'
import App from 'apps/app'
import HomePage from 'apps/app/home'
import Dashboard from 'apps/dashboard'
import LoginPage from 'apps/login'
import ErrorPage from 'apps/error'
import filter from './filter'
import log from './log'
import routes from './routes'

Vue.use(VueRouter)

function buildRoute(apps) {

	let i = 0,
		appNums = apps.length,
		raw_toString = Object.prototype.toString

	for(; i < appNums; i++) {

		let app = apps[i],
			children = app.children

		if(raw_toString.call(children) === '[object Array]') {

			setMeta(app, {
				
				requestAuth: true
			})
		}
	}

	/**
	 * 设置元数据
	 * @param {[type]} app  [description]
	 * @param {[type]} meta [description]
	 */
	function setMeta(app, meta) {

		let j = 0,
			children = app.children,
			len = children.length

		for(; j < len; j++) {

			let child = children[j]

			//设置元信息
			if(!child.meta) {

				child.meta = {}
			}

			Object.assign(child.meta, meta)

			if(raw_toString.call(child.children) === '[object Array]') {

				setMeta(child, meta)
			}
		} 
	}

	return apps
}

let baseUrl = '/ngsoc',
	router = new VueRouter({
	
	base: STI_BASEURL,
	mode: 'history',
	routes: [
		//app访问路由，需要经过登录、认证、授权
		{
			
			path: '',
			component: App,
			children: [

				{
					path: '',
					component: HomePage,
					meta: {
						requestAuth: true
					}
				},
				...buildRoute(routes.apps)
			]
		},
		//大屏访问路由，需要经过登录、认证、授权
		{
			
			path: '/dashboard',
			component: Dashboard,
			children: [

				...buildRoute(routes.dashboards)
			]
		},
		//登录页面，无需登录、认证、授权
		{
			
			path: '/login',
			name: 'login',
			component: LoginPage
		},
		//公共页面路由，无需登录、认证、授权
		{
			
			path: '/public',
			name: 'public',
			component: resolve => require(['apps/public'], resolve)
		},
		//错误页面
		{
			
			path: '*',
			name: 'error',
			component: ErrorPage
		}
	]
})

/**
 * 全局路由钩子
 * 
 * @param  {[type]} 
 * @return {[type]}      [description]
 */
router.beforeEach((to, from, next) => {

	log(to, from, next, store)
	filter(to, from, next, store)
})

export default router

