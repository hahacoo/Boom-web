import './style'
import template from './view'

export default {

	template,

	data() {

		return {

			apps: [{

				c_name: this.$t("commons.safety"),
				desc: '情报态势感知从业务角度开放性的对数据进行筛选、分析、呈现，可直观了解到税务系统当前网络安全态势',
				path: '/test'
			}, {

				c_name: this.$t("commons.situation"),
				desc: '情报态势感知从业务角度开放性的对数据进行筛选、分析、呈现，可直观了解到税务系统当前网络安全态势',
				path: '/visualize/test'
			}]
		}
	}
}