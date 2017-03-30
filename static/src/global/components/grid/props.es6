/*
 * (c) Copyright 2016 STI eXtrem Using技术小组
 * http://www.stixu.com
 */

export default {
	props : {

		encode : {
			type : Boolean,
			default : false
		},
        
        /**
         *  是否对HTML转义
         */
        escape : {
            type : Boolean,
			default : true
        },

		/**
		 * 提交的方式
		 */
		method : {
			type : String,
			default : 'GET'
		},

		/**
		 *
		 */
		colSize : {
			type : Number,
			default : 1
		},

		pageSize : {
			type : Number,
			default : 10
		},

		/**
		 * 标识每行数据的惟一性，如果不能准确标识，则数据选择出错
		 */
		idField : {
			type : String,
			default : 'id'
		},

		/**
		 * 列表的ID
		 */
		id : {
			type : String,
			default : function() {
				let random = (Math.random() + '').substr(-4),
					time = (Date.now().valueOf() + '').substr(-4)

				return 'STI_GRID_' +  random + '_' + time
			}
		},

		/**
		 * 配置是否分页
		 */
		pagable : {
			type : Boolean,
			default : true
		},

		/**
		 * 是否排序
		 */
		sortable : {
			type : Boolean,
			default : false
		},

		/**
		 * 排序的字段名称
		 */
		sortField : {
			type : String,
			default : function() {
				return this.idField
			}
		},

		/**
		 * 排序的方式
		 */
		sortAsc : {
			type : Boolean,
			default : true
		},

		/**
		 * 是否开启树表
		 * @type {Boolean}
		 */
		treeGrid: {
			type : Boolean,
			default : false
		},

		treeDatatype: {
			default : 'local'
		},

		//树表数据获取方式，默认一次加载完全部数据
		ajaxTree: {
			type: Boolean,
			default : false
		},

		//展开列
		expandColumn: {
			type: String,
			default () {
				return this.idField
			}
		},

		//树表的数据格式
		treeGridModel: {
			type: String,
			default: 'adjacency'
		},

		//树表数据映射关系
		treeReader: {
			type: Object,
			default () {

				return {
					"parent_id_field":"parent_id",
					"level_field":"level",
					"leaf_field":"isLeaf",
					"expanded_field":"expanded",
					"loaded":"loaded",
					"icon_field":"icon"
				}
			}
		},

		/**
		 * 请求的数据地址
		 */
		url : {
			type : String
		},

		/**
		 * 在解析之前调用
		 */
		beforeRender : {
			type : Function,
			required : false
		},

		beforeRequest: {
			type: Function,
			required : false
		},

		height : {
			type : String,
			default : 'auto'
		},

		/**
		 * 表格载入完成后触发
		 */
		onReady : {
			type : Function
		},

		onCellClick : {
			type : Function
		},

		/**
		 * 选中每行时触发
		 */
		onRowClick : {
			type : Function
		},

		onSelectAll : {
			type : Function,
		},

		/**
		 * 返回的查询参数
		 */
		query : {
			type : Function
		},

		theme : {
			type : String,
			default : ''
		},

		/**
		 * 是否显示
		 */
		subGrid : {
			type : Boolean,
			default : true
		},

		/**
		 * 子表展开式的函数
		 */
		onExpand : {
			type : Function
		},

		afterExpand : {
			type : Function,
			default : function() {
				return $.noop
			}
		},

		onCollapse : {
			type : Function
		},

		afterCollapse : {
			type : Function,
			default : function() {
				return $.noop
			}	
		},

		/**
		 * 前端排序，传入的数据，若配置，则不会进行URL请求
		 */
		datas : {
			type : Array
		},

		/**
		 * 多选相关
		 */

		multiSelect: {
			type : Boolean,
			default : false
		},

		multiboxonly: {
			type : Boolean,
			default : false
		},

		multiFilter: {
			type : Function,
			default : function(id, data) {

				return true
			}
		},

		/**
		 * 请求的参数
		 */
		prmNames: {
			type : Object
		},

		/**
		 * 导航栏相关
		 */
		showNavBtn: {
			type: Boolean,
			default: true
		}
	},
}