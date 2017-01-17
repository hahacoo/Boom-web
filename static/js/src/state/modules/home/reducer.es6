/**
 * reducer根据action的type属性，更新state
 * 
 */
import * as types from 'state/types'

//初始化状态
const DEFAULT_STATE = 'Hello, World!'

/**
 * 永远返回新的state，不对原有state做修改
 * 
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function todoApp(state = DEFAULT_STATE, action) {

	switch (action.type) {

		case types.TYPE_HOME:

			return action.content
		case types.TYPE_HOME_ASYNC:

			return action.content
		default: 
			//必须
			return state
	}
}