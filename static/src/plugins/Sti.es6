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
import http from 'utils/http'
import { subscibe, publish } from 'event'

let Sti = {

	install: (Vue, option) => {

		//注册系统服务
		Vue.prototype.$http = http
		Vue.prototype.$subscibe = subscibe
		Vue.prototype.$publish = publish

		//注册全局组件
		Vue.component('sti-icon', StiIcon)
		Vue.component('sti-card', StiCard)
		Vue.component('sti-notice', StiNotice)
		Vue.component('sti-assist', StiAssist)
	}
}

export default Sti