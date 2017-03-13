import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { STI_LOCALE_ZH, STI_LOCALE_EN } from 'constant'
import { zh as commons, en as commons_e } from './locales/commons'

Vue.use(VueI18n)

//注册国际化文件
Vue.locale(STI_LOCALE_ZH, {

	commons
})

Vue.locale(STI_LOCALE_EN, {

	commons: commons_e
})

let i18n = {

	init( store, field = 'locale' ) {

		if(typeof store === 'undefined') {

			throw Error('国际化初始化前必须完成store的创建')
		}

		//设置初始化语言
		Vue.config.lang = store.state[field]

		//动态设置语言
		store.watch(state => state[field], locale => Vue.config.lang = locale)
	}
}

export default i18n