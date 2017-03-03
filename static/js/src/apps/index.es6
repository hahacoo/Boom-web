/**
 * app入口文件
 * 1.第三方插件注册
 * 2.平台自身插件注册
 * 3.一级路由入口
 * 
 * by zhangdi 03/01/17
 */

/* 第三方依赖 */
import Vue from 'vue'
import VueMaterial from 'vue-material'
import store from 'store'
import router from 'router'
/* 平台依赖 */
import template from './view'
import Sti from 'plugins/Sti'

Vue.use(VueMaterial)
Vue.use(Sti)

let app = new Vue({

	el: '#sti-app',

	template,

	store,

	router
})
