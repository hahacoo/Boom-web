import loginFilters from './login'

let authfilters = [
	
	loginFilters
]

export default function filter(to, from, next, store) {

	let rootRoute = to.matched[0]

	if(to.meta.requestAuth) {

		//只有业务APP才需要过过滤器
		let len = authfilters.length

		for(let i = 0; i < len; i++) {

			let result = authfilters[i](to, from, store)

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

	if(rootRoute.name === 'login') {

		//登录页面
		let result = loginFilters(to, from, store)

		if(typeof result === 'boolean' && result) {

			//已登录，返回首页
			return next('/')
		}
	}

	//正常跳转
	next()
}