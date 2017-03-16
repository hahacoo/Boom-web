/**
 * 消息总线
 * 跨组件通信
 *
 * by zhangdi
 */
import Vue from 'vue'

//用于跨组件通信
let bus = new Vue()
//用于跨屏通信
let eventList = {},
	prefix = 'sti-event',
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

export default {

	publish(key, ...args) {

		bus.$emit(key, ...args)
	},

	subscribe(key, ...args) {

		bus.$on(key, ...args)
	},

	trigger(key, ...args) {

		let data = {

			key,
			args: args,
			time: +new Date()
		}

		localStorage.setItem(prefix, serialize(data))
	},

	listen(key, callback) {

		if(!eventList[key]) {

			eventList[key] = []
		}

		eventList[key].push(callback)
	}
}
