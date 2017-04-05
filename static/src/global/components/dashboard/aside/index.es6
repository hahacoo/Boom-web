/**
 * 视图组件列表
 */
import { mapGetters, mapActions } from 'vuex'

import './style'
import template from './view.html'
import helper from './helper.html'
import { COMPONENTS, PORTALS}  from '../load'

// COMPONENTS.modal = StiVue.modal
// 
export default {

	template,

	data() {
		return {

			fold: true,
			items: PORTALS,
			result: ''
		}
	},

	props: {

		//拓扑助手
		helper: null,

		//可拖动范围
		containment: null,

		dragStart: {

			type: Function
		}
	},

	computed: {

		...mapGetters({

			count: 'countGetter',
			portalId: 'portalIdGetter'
		})
	},

	components: COMPONENTS,

	methods: {

		...mapActions([

			'addPortal'
		]),

		add: function(portalId) {

			this.addPortal(portalId)
		},

		exportData: function() {

			let res = _.map($('.grid-stack .grid-stack-item:visible'), function (el) {

				el = $(el)

				let node = el.data('_gridstack_node')

				return {
					id: el.attr('data-portal-id'),
					x: node.x,
					y: node.y,
					width: node.width,
					height: node.height
				}
			})

			this.result = JSON.stringify(res)

			//this.$broadcast('sti.modal.open')
		}
	}

}