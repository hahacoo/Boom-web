/**
 * 平台级插件
 * 基础服务扩展
 * 
 * by zhangdi 
 */
/*组件*/
import StiIcon from 'components/icon' 
import StiCard from 'components/card'
import StiNotice from 'components/notice'
import StiAssist from 'components/assist'
import StiSidenav from 'components/sidenav'
import StiDrag from 'components/drag'
import StiConsole from 'components/console'
import { validator, validRule } from 'components/validator'
/*服务*/
import http from 'utils/http'
import { subscribe, publish, listen, trigger } from 'event'
/*过滤器*/
import toPixel from 'filters/toPixel'

let Sti = {

	install: (Vue, option) => {

		//注册系统服务
		Vue.prototype.$http = http
		Vue.prototype.$subscribe = subscribe
		Vue.prototype.$publish = publish
		Vue.prototype.$listen = listen
		Vue.prototype.$trigger = trigger

		//注册全局组件
		Vue.component('sti-icon', StiIcon)
		Vue.component('sti-card', StiCard)
		Vue.component('sti-notice', StiNotice)
		Vue.component('sti-assist', StiAssist)
		Vue.component('sti-sidenav', StiSidenav)
		Vue.component('sti-drag', StiDrag)
		Vue.component('sti-console', StiConsole)
		Vue.component('validator', validator)
		Vue.component('validRule', validRule)

		//注册全局过滤器
		Vue.filter('toPixel', toPixel)
	}
}

export default Sti