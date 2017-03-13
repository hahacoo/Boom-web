/**
 * 消息总线
 * 跨组件通信
 *
 * by zhangdi
 */
import Vue from 'vue'

let bus = new Vue()

export default {

	publish(...args) {

		bus.$emit(...args)
	},

	subscibe(...args) {

		bus.$on(...args)
	}
}
