/**
 * 小屏app
 */
import Vue from 'vue'
import { mapState } from 'vuex'

export default class StiComponent {

	constructor(options) {

		let basic = {

				computed: {

					...mapState({

						//为每个app注入登录信息、用户信息
						isLogin: state => state.isLogin,
						user: state => state.user
					})
				},

				beforeRouteLeave(to, from, next) {

					if(to.meta.confirm) {

						//TODO 判断是否需要确认提示
					}

					next()
				}
			}

		let _options = _.merge(

				basic,
				options
			)

		return Vue.extend(_options)
	}
}

