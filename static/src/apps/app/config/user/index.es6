import './style'
import template from './template'

export default {

	template,

	data () {
		return {
			shown : true, 
			list: [{
				destination: "0.0.0.0/0", 
				gateway: "10.187.101.1", 
				iface: 'eth0', 
				status: 1, 
				mask:'255.255.255.0', 
				id: 1 
			}, {
				destination: "0.0.0.1/1", 
				gateway: "10.187.101.2", 
				iface: 'eth1', 
				status: 1, 
				mask:'255.255.255.0', 
				id: 2 
			}, {
				destination: "0.0.0.2/2", 
				gateway: "10.187.101.3", 
				iface: 'eth2', 
				status: 1, 
				mask:'255.255.255.0', 
				id: 3 
			}]
		}
	},

    methods : {
		formatbtn (val, options, row){

			return '<span class="sti-operation">' +
				'<a class="oper-icon" href="javacript:void(0);" title="编辑"><i data-id=' + row.id + ' class="glyphicon glyphicon-edit" ></i></a>' + 
				'</span>'
		},

		//绑定操作列的事件
		onReady () {
			let that = this,
				grid = this.$refs.routergrid

			//编辑操作，跳转页面
			grid.getView().find('.glyphicon-edit[data-id]').on('click', function () {
				let id = $(this).attr('data-id')

				alert('id是：' + id)
			})
		}
    }
}