/*
 * (c) Copyright 2016 STI eXtrem Using技术小组
 * http://www.stixu.com
 */
export default {

	render(){
		return ''
	},

	props : {

		/**
		 * 对齐的方式
		 */
		align : {
			type : String,
			default : 'left'
		},

		/**
		 * 此列是否可隐藏与显示
		 */
		choosable : {
			type : Boolean,
			default : true
		},

		/**
		 * 显示的标题
		 */
		label : {
			type : String,
			required : true
		},

		/**
		 * 从数据列里取的名称
		 */
		name : {
			type : String,
			required : true
		},
		
		index : {
			type : String,
			default : function() {
				return this.name
			}
		},

		order : {
			type : Number,
			default : 0
		},

		/**
		 * 宽度
		 */
		width : {
			type : Number
		},

		/**
		 * 是否支持排序
		 */
		sortable : {
			type : Boolean,
			default : true
		},

		/**
		 * 是否显示在明细中
		 *
		 */
		detail : {
			type : Boolean,
			default : true
		},

		/**
		 * 是否显示显示
		 */
		hidden : {
			type : Boolean,
			default : false
		},

		/**
		 * 支持JQGrid的内置格式化器
		 */
		formatter : [ String, Function ], 
		
		fmtOptions : [ Object, String ], 
		
		/**
		 * 在formatter之后调用
		 */
		domFormatter : {
			type : Function
		}
	},

	computed : {

		define () {
			return {
				choosable : this.choosable,
				shown : !this.hidden,
				detail : this.detail,
				hidden : this.hidden,
				align : this.align,
				formatter : this.formatter,
				index : this.index,
				name : this.name,
				order : this.order,
				label : this.label,
				sortable : this.sortable,
				width : this.width,
				unformat : this.domFormatter
			}
		}

	},
	
	/**
	 * 
	 */
	created () {
		this.tagName = 'JQ_COL'
		if(this.$parent.tagName !== 'JQ_GRID') {
			throw new Error('parent must be JQ_GRID!')
		}
		this.$parent.receive()
	}
}