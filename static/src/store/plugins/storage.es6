/**
 * vuex本地化存储插件
 *
 * by zhangdi
 */
import _ from 'lodash'

export default function storagePlugin({

	namespace = 'sti-vux-',
	storage = localStorage,
	persistence = []
} = {}) {

	let serialize = JSON.stringify,
		deserialize = JSON.parse,
		isAll = persistence.length == 0

	/**
	 * 获取持久化的state
	 * @param  {[type]} state [description]
	 * @return {[type]}       [description]
	 */
	function getState(state) {

		let data = {},
			keys = isAll ? Object.keys(state) : persistence,
			i = 0,
			len = keys.length

		for(; i < len; i++) {

			let key = keys[i]

			data[key] = deserialize(storage.getItem(namespace + key)) 
					|| state[key]
		}

		return data
	}

	/**
	 * 持久化state
	 * @param  {[type]} state [description]
	 */
	function setState(state) {

		let keys = isAll ? Object.keys(state) : persistence,
			i = 0,
			len = keys.length

		for(; i < len; i++) {

			let key = keys[i]

			storage.setItem(namespace + key, serialize(state[key]))
		}
	}

	return store => {

		let state = store.state

		//初始化state
		store.replaceState(

			_.merge(

				{},
				state, 
				getState(state)
			)
		)

		//持久化state
		store.subscribe((mutation, state) => {

			setState(state)
		})
	}
}