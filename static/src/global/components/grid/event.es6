/*
 * (c) Copyright 2016 STI eXtrem Using技术小组
 * http://www.stixu.com
 */
let local = 'cn'

export default {
	methods : {
		/**
		 * 绑定事件
		 */
		bindEvents (options) {
			let that = this

			if($.type(this.onCellClick) === 'function') {
				Object.assign(options, {
					onCellSelect : this.onCellClick
				})
			}

			if($.type(this.onRowClick) === 'function') {
				Object.assign(options, {
					onSelectRow : this.onRowClick
				})
			}

			let initGrid = () => {
				if(local == 'cn'){
					//中文需要自行补充某些国际化
					that.i18nCNAdd()
				}

				//重新计算一次表格的宽度，解决某些bug
				let grid = $('.sti-jq-grid #gbox_' + that.id).parent(),
					width = grid.width()

				that.resizeGridWidth(width)
			}

			if($.type(this.onReady) === 'function') {
				Object.assign(options, {
					gridComplete : function(){
						that.onReady()

						initGrid()
					}
				})
			} else{
				Object.assign(options, {
					gridComplete : function(){
						initGrid()
					}
				})
			}

			if($.type(this.beforeRequest) === 'function') {
				Object.assign(options, {
					beforeRequest : function() {

						that.beforeRequest(this)
					}
				})
			}

			if($.type(this.onSelectAll) === 'function') {
				Object.assign(options, {
					onSelectAll : function() {

						that.onSelectAll(this)
					}
				})
			}

			//载入完成的事件
			Object.assign(options, {

				loadComplete: function(){

					//如果没有数据，则在正中间提示
					let records = that.view.jqGrid('getGridParam', 'reccount'),
						noDataLabelId = 'STI_NO_DATA_' + that.view.attr('id')

					if(records == 0){
						let emptyMessage = '<div id="' + noDataLabelId + '" style="position:absolutetop:45%left:45%z-index:102">' + that.view.jqGrid('getGridParam', 'emptyrecords') + '</div>'

						//如果还没有，就添加，反之，就修改属性
						if($('#' + noDataLabelId).length == 0){
							$('#load_' + that.view.attr('id')).before(emptyMessage)
						} else {
							$('#' + noDataLabelId).css('display', 'block')
						}
						
					} else{
						$('#' + noDataLabelId).css('display', 'none')
					}

					//重新设置page input的宽度，使其能够显示完整的内容
					let lastPage = that.view.jqGrid('getGridParam', 'lastpage')
					
					$('#input_' + that.view.attr('id') + '.ui-pg-input').attr('size', lastPage.toString().length)
				}
			})

		},

		/**
		 * @function 获取当前选中行,只有启用了multiSelect时才有效,返回所有选中行的id
		 * @return 获取所有选中行的id,以数组形式
		 */
		getSelected : function() {

			if(this.multiSelect) {

				return this.view.jqGrid('getGridParam', "selarrrow")
			}

			return this.getFocus()
		},

		/**
		 * @function 获取当前焦点所在的行的id
		 */
		getFocus : function() {
			return this.view.jqGrid('getGridParam', "selrow")
		},

		/**
		 * 重新提交查询,刷新当前列表
		 * @isBack 是否需要返回到第一页
		 * @function 重新提交查询,刷新当前列表
		 */
		reload (isBack) {
			let page = this.view.jqGrid('getGridParam', "page"),
				url = this.view.jqGrid('getGridParam', "url"),
				param = this.view.jqGrid('getGridParam', "postData"),
				that = this

			//不在第一页查询时，返回第一页
			if(isBack) {
				page = 1
			}
			
			if(page != 1){
				$.get(url, param, function(res){
					if(res.data.data === null || res.data.data.length == 0){
						page -= 1
					}
					that.view.jqGrid('setGridParam', {page: page}).trigger("reloadGrid")
				})
			} else{
				this.view.jqGrid('setGridParam', {page: page}).trigger("reloadGrid")
			}
		},

		/**
		 * @function 根据id获取当前行数据
		 * @param id 当前所在行的id
		 * @return 以数组方式返回id所代表行的数据
		 */
		getRowData (id) {
			if(Array.isArray(this.datas)){

				return  this.view.jqGrid('getLocalRow', id)
			}

			return  this.view.jqGrid('getRowData', id)
			//return  this.view.jqGrid('getRowData',id)
		},

		/**
		 * 获取原始数据
		 * @param  {[type]} id [description]
		 * @return {[type]}    [description]
		 */
		getRawData (id) {
			if(Array.isArray(this.datas)){

				return  this.datas.filter(data => data[this.idField] == id)
			}

			return  this.rawDataSet.filter(data => data[this.idField] == id)
		},

		/**
		 * 返回DOM对象
		 */
		getView () {
			return this.view
		},

		getCell (id, icol){
			return this.view.jqGrid('getCell', id, icol)
		},
	}
}