/**
 * 增加jquery.ajax代理
 * 确保平台所有请求可控（平台自身数据接口，第三方库）
 * 
 */
import $ from 'jquery'
import { STI_AJAX_TIMEOUT } from 'constant'
import { HttpLogger } from 'utils/Logger'
import Console from 'utils/Console'

function proxyAjax({

	param = {},
	alwaysHandler = () => void(0),
	successHandler = () => void(0),
	errorHandler = () => void(0)
} = {}) {

	let handler = {

		apply(target, thisBinding, args) {

			if(args === undefined || args.length === 0) {

				throw Error('参数不能为空！')
			}

			let [ url, settings = {} ] = args

			let _beforeSend = settings.beforeSend

			let logger

			//设置通用参数
			Object.assign(settings, {

				data: {

					...settings.data,
					...param
				},

				beforeSend: function() {

					_beforeSend && _beforeSend()
					logger = new HttpLogger({

						output: new Console('http')
					})
				},

				timeout: STI_AJAX_TIMEOUT
			})

			let deferred = Reflect.apply(target, thisBinding, [ url, settings ])
						.always(function(data, state, xhr) {
							logger.request(url)
							logger.elapse()
							alwaysHandler()
						})
						.done(function(data, state, xhr) {

							logger.state(state)
							logger.response(data)
							successHandler()
						})
						.catch(function(xhr, state, errorThrown) {

							logger.state(state)
							errorHandler()
						})

			return deferred
		}
	}

	$.ajax = new Proxy($.ajax, handler)
}

export default proxyAjax

