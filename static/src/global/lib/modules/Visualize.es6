/**
 * 大屏app
 */
import Vue from 'vue'
import { mapState } from 'vuex'

function Visualize(compTemp, options) {

	//基础配置
	let basic = {

			computed: {

				...mapState({

					//为每个app注入登录信息、用户信息
					isLogin: state => state.isLogin,
					user: state => state.user
				})
			},

			template:`
				<div class="visualize-main">
					${compTemp}
				</div>
			`
		}

	let _options = _.merge(

			basic,
			options
		)

	return Vue.extend(_options)
}

export default Visualize

