/**
 * 测试公共访问页面
 */
import './style'
import template from './view'
import header from 'apps/app/components/header'

export default {

	template,

	data: function() {

		return {

			draggable: {
				stop: function( event, ui ) {

					console.log(ui)
				}
			},
			editable: true,
			verticalMargin: 0,
			cellHeight: 100
		}
	},

	components: {

		publicHeader: header
	}
}