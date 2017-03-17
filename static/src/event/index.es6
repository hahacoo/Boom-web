/**
 * 消息总线
 * 跨组件通信
 *
 * by zhangdi
 */
import Vue from 'vue'

import { STI_EVENT_PREFIX } from 'constant'

//用于跨组件通信
let eventHub = new Vue()
//用于跨屏通信
let eventList = {},
	prefix = STI_EVENT_PREFIX,
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

function publish(key, ...args) {

	eventHub.$emit(key, ...args)
}

function subscribe(key, callback) {

	eventHub.$on(key, callback.bind(this))
}

function trigger(key, ...args) {

	let data = {

		key,
		args: args,
		time: +new Date()
	}

	localStorage.setItem(prefix, serialize(data))
}

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
