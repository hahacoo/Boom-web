import './style'
import template from './view.html'
import { getClosestVueParent } from 'utils'

export default {

	template,

	data() {

		return {

			locked: false
		}
	},

	props: {

		editable: {

			default: false
		}, 

		id: {
			required: true
		},

		gsX: {

			default: 0
		},

		gsY: {

			default: 0
		},

		gsWidth: {

			default: 1
		},

		gsHeight: {

			default: 1
		}

	},

	methods: {

		remove() {

			this.parentDashboard.remove(this.$el)
		},

		lock() {

			this.locked = !this.locked
			this.parentDashboard.lock(this.$el, this.locked)
		},

		edit() {
			
		}
	},

	mounted() {

		this.parentDashboard = getClosestVueParent(this.$parent, 'dashboard-container')

		if (!this.parentDashboard) {

			throw new Error('portal组件必须作为dashboard的子组件!')
		}
    }

}