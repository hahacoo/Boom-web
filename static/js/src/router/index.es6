import Vue from 'vue'
import VueRouter from 'vue-router'
import CryptoJS from 'crypto-js'

import Main from 'apps/main'
import HomePage from 'apps/main/home'
import LoginPage from 'apps/login'
import ErrorPage from 'apps/error'
import routes from './routes'
import { beforeEachFilters } from './BeforeChain'

import login from 'router/filters/login'

Vue.use(VueRouter)

// Encrypt
//let ciphertext = CryptoJS.AES.encrypt('my message', 'sti web')

// Decrypt
//let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'sti web')
//let plaintext = bytes.toString(CryptoJS.enc.Utf8)

/**
 * 为app设置默认视图
 * @param  {[type]} apps [description]
 * @return {[type]}      [description]
 */
function buildApps(apps) {

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
	
	base: baseUrl,
	mode: 'history',
	routes: [
		//app访问路由，需要经过登录、认证、授权
		{
			
			path: '',
			name: 'main',
			component: Main,
			children: [

				{
					path: '',
					component: HomePage,
					meta: {
						requestAuth: true
					}
				},
				...buildApps(routes.apps)
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
 * 进行登录、认证、授权操作
 * 
 * @param  {[type]} 
 * @return {[type]}      [description]
 */
router.beforeEach((to, from, next) => {

	let len = beforeEachFilters.length,
		rootRoute = to.matched[0] // (main|login|public|error)

	for(let i = 0; i < len; i++) {

		//只有属于main入口下的才需要过过滤器
		if(rootRoute.name === 'main') {

			let result = beforeEachFilters[i](to, from)

			//过滤失败
			if(!result) {

				return next(false)
			}

			//发生跳转
			if(typeof result === 'string' || typeof result === 'object') {

				return next(result)
			}
		}
	}

	//正常跳转
	next()
})

export default router

