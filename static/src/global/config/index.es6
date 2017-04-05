/**
 * 创建只读配置代理
 *
 * by zhangdi
 */
import config from 'config'

const $config = new Proxy({

	...config
}, {

	get(target, key) {

		return Reflect.get(target, key)
	},

	set(target, key) {

		throw Error('配置为只读属性，不允许修改')
	}
})

export default $config