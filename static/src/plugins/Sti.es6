/**
 * 平台级插件
 * 基础服务扩展
 * 
 * by zhangdi 
 */
import StiIcon from 'components/icon' 
import StiCard from 'components/card'
import StiNotice from 'components/notice'
import StiAssist from 'components/assist'
import StiSidenav from 'components/sidenav'
import http from 'utils/http'
import { subscribe, publish, listen, trigger } from 'event'

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
	}
}

export default Sti