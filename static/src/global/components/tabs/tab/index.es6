import template from './view'
import { getClosestVueParent } from 'utils'

export default {

	template,

	props: {

		//tabid
		id: {

			type: String,
			required: true
		},

		//tab标签
		label: String,

		//tab图标
		icon: String,

		//是否选中
		active: {

			type: Boolean,
			default: false
		},

		//是否禁用
		disable: {

			type: Boolean,
			default: false
		}
	},

	watch: {

		label(val) {

			this.parentTabs.registryTab(this.getTabData())
		}
	},

	methods: {

		getTabData() {

			return {

				id: this.id,
				el: this.$el,
				label: this.label,
				icon: this.icon,
				active: this.active,
				disable: this.disable
			}
		}
	},

	mounted() {

		let tabData = this.getTabData()

		this.parentTabs = getClosestVueParent(this.$parent, 'sti-tabs')

		if (!this.parentTabs) {

			throw new Error('tab组件必须作为tabs的子组件!')
		}

		this.parentTabs.registryTab(tabData)
    }
}