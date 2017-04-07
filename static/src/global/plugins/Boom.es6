/**
 * 平台级插件
 * 基础服务扩展
 * 
 * by hahacoo 
 */

import config from 'global/config'
/*组件*/
import BoomIcon from 'components/icon' 
import BoomCard from 'components/card'
import BoomNotice from 'components/notice'
import BoomAssist from 'components/assist'
import BoomSidenav from 'components/sidenav'
import BoomDrag from 'components/drag'
import BoomConsole from 'components/console'
import BoomProgress from 'components/progress'
import BoomTabs from 'components/tabs'
import BoomTab from 'components/tabs/tab'
import BoomDashboard from 'components/dashboard'
import BoomDashaside from 'components/dashboard/aside'
import BoomSearch from 'components/search'
import BoomLoading from 'components/loading'
/*服务*/
import { subscribe, publish, listen, trigger } from 'event'
import { setParam, getParam } from 'router/param'
import { remove } from './array'
/*过滤器*/
import {

	capitalize,
	uppercase,
	lowercase,
	currency,
	json,
	toPixel
} from 'filters'

let Boom = {

	install: (Vue, option) => {

		//注册系统服务
		Vue.prototype.$subscribe = subscribe
		Vue.prototype.$publish = publish
		Vue.prototype.$listen = listen
		Vue.prototype.$trigger = trigger
		Vue.prototype.$setParam = setParam
		Vue.prototype.$getParam = getParam
		Vue.prototype.$remove = remove
		Vue.prototype.$config = config
		Object.defineProperty(Vue.prototype, '$config', {

			writable: false
		})
		
		//注册全局组件
		Vue.component('boom-icon', BoomIcon)
		Vue.component('boom-card', BoomCard)
		Vue.component('boom-notice', BoomNotice)
		Vue.component('boom-assist', BoomAssist)
		Vue.component('boom-sidenav', BoomSidenav)
		Vue.component('boom-drag', BoomDrag)
		Vue.component('boom-console', BoomConsole)
		Vue.component('boom-progress', BoomProgress)
		Vue.component('boom-tab', BoomTab)
		Vue.component('boom-tabs', BoomTabs)
		Vue.component('boom-search', BoomSearch)
		Vue.component('boom-loading', BoomLoading)
		Vue.component('boom-dashboard', BoomDashboard)
		Vue.component('boom-dashaside', BoomDashaside)

		//注册全局过滤器
		Vue.filter('capitalize', capitalize)
		Vue.filter('uppercase', uppercase)
		Vue.filter('lowercase', lowercase)
		Vue.filter('currency', currency)
		Vue.filter('json', json)
		Vue.filter('toPixel', toPixel)
	}
}

export default Boom