/**
 * actions用来描述发生了什么，执行了什么动作
 * 
 * 异步操作要定义在action
 * 
 */
import * as types from 'state/types'

/**
 * 定义同步操作
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
export function homeChange(text) {

	return {

		type: types.TYPE_HOME,
		content: text
	}
}

/**
 * 创建异步操作
 * thunk中间件，会将action执行结果返回，如果返回promise，就可以进行链式操作
 * @return {[type]} 返回一个函数，传入两个参数dispatch，getState
 */
export function homeChangeAsync() {

	let delay = 2000

	return dispatch => {

		setTimeout(() => {

			dispatch(homeChange('thunk'))
		}, delay)
	}

}

/**
 * 创建异步操作
 * promise中间件，返回promise对象，自动获取resolve的值
 * @return {[type]} [description]
 */
export async function homeChangePromise() {

	let delay = 2000,
		content = await new Promise(resovle => {

			setTimeout(() => {

				resovle('promise')
			}, delay)
		})

	return {

		type: types.TYPE_HOME_ASYNC,
		content: content
	}
}