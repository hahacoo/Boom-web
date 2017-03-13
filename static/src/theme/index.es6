import Vue from 'vue'
import VueMaterial from 'vue-material'

import themes from './themes'

Vue.use(VueMaterial)
//注册主题样式
Vue.material.registerTheme(themes)

let themePlugin  = {

	init(store, field = 'theme') {

		if(typeof store === 'undefined') {

			throw Error('国际化初始化前必须完成store的创建')
		}

		//设置初始化语言
		Vue.material.setCurrentTheme(store.state[field])

		//动态设置语言
		store.watch(

			state => state[field], 
			theme => {

				Vue.material.setCurrentTheme(theme)
			}
		)
	}
}

export default themePlugin

