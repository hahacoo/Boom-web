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
import StiProgress from 'components/progress'
import StiTabs from 'components/tabs'
import StiTab from 'components/tabs/tab'
import { 
	
	validator as StiValidator, 
	validRule as StiValidRule 
} from 'components/validator'
import { 
	
	jqGrid as StiJqGrid, 
	jqCol as StiJqCol
} from 'components/grid'
/*服务*/
import { subscribe, publish, listen, trigger } from 'event'
import { setParam, getParam } from 'router/param'
/*过滤器*/
import {

	capitalize,
	uppercase,
	lowercase,
	currency,
	json,
	toPixel
} from 'filters'

let Sti = {

	install: (Vue, option) => {

		let locale = 'cn'

		//注册系统服务
		Vue.prototype.$subscribe = subscribe
		Vue.prototype.$publish = publish
		Vue.prototype.$listen = listen
		Vue.prototype.$trigger = trigger
		Vue.prototype.$setParam = setParam
		Vue.prototype.$getParam = getParam

		//注册全局组件
		Vue.component('sti-icon', StiIcon)
		Vue.component('sti-card', StiCard)
		Vue.component('sti-notice', StiNotice)
		Vue.component('sti-assist', StiAssist)
		Vue.component('sti-sidenav', StiSidenav)
		Vue.component('sti-drag', StiDrag)
		Vue.component('sti-console', StiConsole)
		Vue.component('sti-progress', StiProgress)
		Vue.component('sti-tab', StiTab)
		Vue.component('sti-tabs', StiTabs)
		Vue.component('sti-validator', StiValidator)
		Vue.component('sti-validrule', StiValidRule)
		Vue.component('sti-grid', StiJqGrid)
		Vue.component('sti-col', StiJqCol)

		//注册全局过滤器
		Vue.filter('capitalize', capitalize)
		Vue.filter('uppercase', uppercase)
		Vue.filter('lowercase', lowercase)
		Vue.filter('currency', currency)
		Vue.filter('json', json)
		Vue.filter('toPixel', toPixel)
	}
}

export default Sti