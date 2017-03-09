/**
 * app入口文件
 * 1.第三方插件注册
 * 2.平台自身插件注册
 * 3.一级路由入口
 * 
 * by zhangdi 03/01/17
 */

//第三方依赖
import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueI18n from 'vue-i18n'
import store from 'store'
import router from 'router'
//平台依赖
import { createRoot } from 'utils/StiBuilder'
import Sti from 'plugins/Sti'
import i18n from 'i18n'
import themes from 'bases/themes'

Vue.use(VueMaterial)
Vue.use(VueI18n)
Vue.use(Sti)

//注册主题样式
Vue.material.registerTheme(themes)
//注册国际化文件
Object.keys(i18n).forEach(lang => Vue.locale(lang, i18n[lang]))
Vue.config.lang = store.state.locale
//动态设置语言
store.watch(state => state.locale, locale => Vue.config.lang = locale)

let app = new Vue(createRoot({

	el: '#sti-app',

	store,

	router
}))
