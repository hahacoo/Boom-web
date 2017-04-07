/**
 * 消息总线
 * 跨组件通信
 *
 * by hahacoo
 */
import Vue from 'vue'

import { BOOM_EVENT_PREFIX } from 'constant'

//用于跨组件通信
let eventHub = new Vue()
//用于跨屏通信
let eventList = {},
	prefix = BOOM_EVENT_PREFIX,
	serialize = JSON.stringify,
	deserialize = JSON.parse

window.addEventListener('storage', e => {

	if(e.key && e.key === prefix) {

		let data = deserialize(e.newValue),
			key = data.key,
			listeners = eventList[key]
		
		if(!listeners || listeners.length == 0) {

			return false
		}

		let i = 0,
			len = listeners.length

		for(; i < len; i++) {

			listeners[i].apply(undefined, data.args)
		}
	}	
})

/**
 * 跨组件发布消息
 * @param  {[type]}    key  名称
 * @param  {...[type]} args 数据
 * @return {[type]}         [description]
 */
function publish(key, ...args) {

	eventHub.$emit(key, ...args)
}

/**
 * 跨组件订阅消息
 * @param  {[type]}   key      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function subscribe(key, callback) {

	eventHub.$on(key, callback.bind(this))
}

/**
 * 跨窗口触发事件
 * @param  {[type]}    key  [description]
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
function trigger(key, ...args) {

	let data = {

		key,
		args: args,
		time: +new Date()
	}

	localStorage.setItem(prefix, serialize(data))
}

/**
 * 跨窗口监听事件
 * @param  {[type]}   key      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function listen(key, callback) {

	if(!eventList[key]) {

		eventList[key] = []
	}

	eventList[key].push(callback)
}

export {

	publish,

	subscribe,

	trigger,

	listen
}
