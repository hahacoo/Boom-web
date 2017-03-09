/**
 * 平台级插件
 * 基础服务扩展
 * 
 * by zhangdi 
 */
import StiIcon from 'components/icon' 
import StiCard from 'components/card'

import $ from 'jquery'

let Sti = {

	install: (Vue, option) => {

		//注册全局组件
		Vue.component('sti-icon', StiIcon)
		Vue.component('sti-card', StiCard)

		//注册系统服务
	}
}

export default Sti