/**
 * 增加jquery.ajax代理
 * 确保平台所有请求可控（平台自身数据接口，第三方库）
 * 
 */
import $ from 'jquery'
import { STI_AJAX_TIMEOUT } from 'constant'

function proxyAjax({

	param = {},
	alwaysHandler = () => void(0),
	successHandler = () => void(0),
	errorHandler = () => void(0)
} = {}) {

	let handler = {

		apply(target, thieBinding, args) {

			if(args === undefined || args.length === 0) {

				throw Error('参数不能为空！')
			}

			let [ url, settings = {} ] = args

			//设置通用参数
			Object.assign(settings, {

				data: {

					...settings.data,
					...param
				},

				timeout: STI_AJAX_TIMEOUT
			})

			let deferred = Reflect.apply(target, thieBinding, [ url, settings ])
						.always(alwaysHandler)
						.done(successHandler)
						.catch(errorHandler)

			return deferred
		}
	}

	$.ajax = new Proxy($.ajax, handler)
}

export default proxyAjax

