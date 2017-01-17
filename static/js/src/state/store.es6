/**
 * 一个App中只有一个store
 * 
 * 通过store将action和reducer联系起来
 * 维持应用的state
 * 提供getState()获取state
 * 提供dispatch(action)更新state
 * 通过subscribe(listener)注册监听函数
 * 通过subscribe(listener)返回的函数注销监听
 * 
 */
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'
import reducerApp from './reducers'

/**
 * 创建store
 * 
 * createStore有三个参数
 * 1.第二个参数用于设置state的初始状态
 * 2.第三个参数用于设置store增强函数
 *
 * applyMiddleware用来包装action
 * callbak传入store作为参数
 * 返回一个函数，传入参数next,action
 * 
 * @type {[type]}
 */
const store = createStore(

	reducerApp,
	applyMiddleware(thunkMiddleware, promiseMiddleware)
	)

if(module.hot) {

	module.hot.accept(() => {

		const nextReducers = require('./reducers')

		store.replaceReducer(nextReducers)
	})

	module.hot.accept('./reducers', () => {

		const nextReducers = require('./reducers')

		store.replaceReducer(nextReducers)
	})
}

export default store