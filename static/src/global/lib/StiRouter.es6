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
	before(plugin) {

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

	after(plugin) {

		this.router.afterEach((to, from, next) => {

			let result = plugin(to, from)

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

		let _routes = _.cloneDeep(routes)

		let i = 0,
			appNums = _routes.length

		for(; i < appNums; i++) {

			setMeta(_routes[i], meta)
		}

		/**
		 * 设置元数据
		 * @param {[type]} app  [description]
		 * @param {[type]} data [description]
		 */
		function setMeta(app, data) {

			assign(app, meta)

			let children = app.children

			if(raw_toString.call(children) !== '[object Array]') {

				return 
			}

			let j = 0,
				len = children.length - 1,
				defaultView

			for(; len >= 0; len--) {

				let child = children[len]

				//设置非路由项，如空二级菜单
				if(!child.component) {

					children.splice(len, 1)
					continue
				}

				//设置元信息
				assign(child, data)

				//设置默认视图
				if(child.defaultView) {

					defaultView = {

						path: '',
						redirect: child.path
					}
				}

				if(raw_toString.call(child.children) === '[object Array]') {

					setMeta(child, data)
				}
			}

			if(defaultView) {

				children.push(defaultView)
			}
		}

		function assign(comp, data) {

			//设置元信息
			if(!comp.meta) {

				comp.meta = {}
			}

			Object.assign(comp.meta, data)
		}

		return _routes
	}
}
