import Vue from 'vue'
import VueRouter from 'vue-router'

import { STI_BASEURL, STI_ROUTE_MODE } from 'constant'

Vue.use(VueRouter)

let raw_toString = Object.prototype.toString

export default class Router {

	constructor({
		
		baseUrl = STI_BASEURL,
		mode = STI_ROUTE_MODE,
		routes = [],
		store = undefined
	} = {}) {

		this.store = store
		this.init(baseUrl, mode, routes)
	}

	init(baseUrl, mode, routes) {

		this.router = new VueRouter({
	
			base: baseUrl,
			mode: mode,
			routes: routes
		})
	}

	/**
	 * 注册路由
	 * @param  {String} path      [description]
	 * @param  {[type]} component [description]
	 * @param  {[type]} options   [description]
	 * @return {[type]}           [description]
	 */
	register(path = '', component, options) {

		if(typeof path !== 'string') {

			//TODO 错误提示
		}

		this.router.addRoutes([

			{
				
				path,
				component,
				...options	
			}
		])

		return this
	}

	/**
	 * 注册插件
	 * @param  {[type]} plugin [description]
	 * @return {[type]}        [description]
	 */
	plugins(plugin) {

		this.router.beforeEach((to, from, next) => {

			let result = plugin(to, from, this.store)

			if(result instanceof Promise) {

				//返回promise对象
				result.then(res => {

					next(res)
				}).catch(error => {

					//TODO 错误处理
				})
			} else {

				//同步执行
				next(result)
			}
		})

		return this
	}

	/**
	 * 设置元数据
	 * @param {[type]} routes [description]
	 * @param {[type]} meta   [description]
	 */
	static setMetas(routes, meta) {

		let i = 0,
			appNums = routes.length

		for(; i < appNums; i++) {

			let app = routes[i],
				children = app.children

			if(raw_toString.call(children) === '[object Array]') {

				setMeta(app, meta)
			}
		}

		/**
		 * 设置元数据
		 * @param {[type]} app  [description]
		 * @param {[type]} data [description]
		 */
		function setMeta(app, data) {

			let j = 0,
				children = app.children,
				len = children.length

			for(; j < len; j++) {

				let child = children[j]

				//设置元信息
				if(!child.meta) {

					child.meta = {}
				}

				Object.assign(child.meta, data)

				if(raw_toString.call(child.children) === '[object Array]') {

					setMeta(child, data)
				}
			} 
		}

		return routes
	}
}
