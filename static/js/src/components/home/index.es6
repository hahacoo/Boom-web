/**
 * 头部组件
 *
 * by zhangdi
 */
import './style'
import template from './view'
import stiCard from 'components/card'

export default {

	template,

	data() {

		return {

			apps: [{

				c_name: '安全检测子系统',
				desc: '情报态势感知从业务角度开放性的对数据进行筛选、分析、呈现，可直观了解到税务系统当前网络安全态势'
			}, {

				c_name: '态势感知子系统',
				desc: '情报态势感知从业务角度开放性的对数据进行筛选、分析、呈现，可直观了解到税务系统当前网络安全态势'
			}, {

				c_name: '通报预警子系统',
				desc: '通报预警子系统'
			}, {

				c_name: '通用配置子系统',
				desc: '配置系统<br>各App运行所需的通用信息'
			}]
		}
	},

	components: {

		stiCard
	}
}