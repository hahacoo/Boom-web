/**
 * 将reducer按模块拆分
 * 分别管理自己的state
 *
 * based on redux
 */
import { combineReducers } from 'redux'
import home from './modules/home/reducer'

/**
 * combineReducers函数
 * 等价于 function reducerApp(state = {}, action) {
 *
 *		return {
 *			home: home(state.home, action)
 *		}
 * 
 * }
 * @type {[type]}
 */
let reducerApp = combineReducers({

	home
})

export default reducerApp
