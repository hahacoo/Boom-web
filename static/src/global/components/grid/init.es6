/*
 * (c) Copyright 2016 STI eXtrem Using技术小组
 * http://www.stixu.com
 */
import subTemplate from './SubGrid.html'
import Vue from 'vue'

let SubGrid = Vue.extend({

	template : subTemplate,

	data () {
		return {
			item : []
		}
	}
})

export default {
	methods : {
		/**
		 * 创建工具栏
		 */
		buildToolBar () {
			let pagerEl = "#" + this.pagerId,
				that = this

			this.view.navGrid(pagerEl, {
				edit: false,
				add: false,
				del: false,
				search: false,
				refresh: false,
				view: false,
				position: "left",
				cloneToTop: true
			})

			if(this.showNavBtn){
				this.view.navButtonAdd(pagerEl, {
					buttonicon: "glyphicon glyphicon-cog",
					title: "配置显示列",
					caption: "",
					position: "last",
					onClickButton () {
						that.showDialog = true
					}
				})
			}
			
		},

		/**
		 * 渲染表格
		 */
		render () {
			let options = this.defaults()

			this.view = $("#" + this.id, this.$el)
			//	配置分页
			this.initPager(options)
			this.initSorter(options)
			this.initUrl(options)
			this.initTemplate(options)
			this.bindEvents(options)
			this.initQuery(options)
			this.initTreeGrid(options)
			//	配置数据
			Object.assign(options, {
				colModel : this.colModel
			})
			this.initSubGrid(options)
			//
			if($.type(this.beforeRender) == 'function') {
				options = this.beforeRender(this.view, options)
			}
            //  处理HTML转义
            if(this.escape) {
                options.beforeProcessing = function(data) {
                    if(data.data) {
                        let datas = data.data,
                            str = JSON.stringify(datas),
                            pat = />/g,
                            pat2 = /</g,
                            escapseData = str.replace(pat, '&gt').replace(pat2, '&lt')

                        data.data = JSON.parse(escapseData)
                    }                 
                }
            }            
            //  渲染表格
			this.view.jqGrid(options)
			//this.buildToolBar()			
		},

		/**
		 * 初始化子表格
		 */
		initSubGrid (options) {
			//	开启函数
			let onExpand = (rowId, rowKey) => {
					//	避免出现特殊的字符，如空格等
					let viewCont = document.getElementById(rowId),
						rowData = this.getRowData(rowKey),
						items = []

					this.colModel.forEach(col => {
						if(col.detail) {
							let names = col['label'],
								value = rowData[col.name]
							
							items.push({
								names, value
							})
						}
					})
					let that = this

					new SubGrid({
						replace : false,
						parent : this,
						data : {
							items : items
						},
						ready () {
							that.afterExpand(this.$el, viewCont, rowKey)
						}
					}).$mount(viewCont)
				},
				//	关闭函数
				onCollapse = (rowId, rowKey) => {
					let viewCont = document.getElementById(rowId),
						idMatcher = rowId.match(/[\[\]:. ]/)
					
					//	出现了特殊字符，必须删除
					//	alert($('[id="' + rowId + '"]').length
					if(idMatcher && idMatcher.length > -1) {
						let viewRow = viewCont.parentElement.parentElement
						
						viewRow.remove(true)
					}
					this.afterCollapse(viewCont, rowId, rowKey)
					
					return true
				}

			//
			if(this.onExpand) {
				onExpand = this.onExpand
			}
			//
			if(this.onCollapse) {
				onCollapse = this.onCollapse
			}
			//
			if(this.subGrid) {
				Object.assign(options, {
					rownumWidth: 35,
					subGrid : true,
					subGridWidth : 20,
					subGridOptions : {
						openicon : "",
						delayOnLoad : 50,
						expandOnLoad: false, //在加载父表时就展开子表,并录入子表的数据
						selectOnExpand : false, //选中就会载载入数据
						reloadOnExpand : false //每次展开都会重新加载数据
					},
					subGridRowExpanded : onExpand,
					subGridRowColapsed : onCollapse
				})
			}
		},

		initQuery (options) {
				let queryMethod = function() {
					return {}
				}

				if(this.query) {
					queryMethod = this.query
				}
				Object.assign(options, {
					autoencode : this.encode, //转义服务器传送的数据，将HTML片段转义为普通字符串
					mtype: this.method, //数据的请求方式
					serializeGridData : function(postData) {
						let queryObj = queryMethod()

						return Object.assign(postData, queryObj)
					}
				})
		},

		/**
		 * 默认的配置选项
		 */
		defaults () {
			let height = this.lastHeight

			return {
				height, 
				styleUI : 'Bootstrap', 
				emptyrecords : "暂时没有数据", 
				autowidth : true, 
				shrinkToFit : true, 
				cellLayout : 10, 
				altRows : false, //是否间隔显示记录
				hoverrows : true, //是否激活Hover事件
				loadonce : false, 
				multiselect: this.multiSelect, 
				multiboxonly: this.multiboxonly 
			}
		},

		/**
		 * 配置分页
		 */
		initPager (options) {
			if(this.pagable) {
				Object.assign(options, {
					pgbuttons : true, //是否显示
					rowNum : this.pageSize, //每页的数量
					rownumWidth : 30, 
					pginput : true, //是否可以输入页码
					viewrecords: true, //是否显示记录条数
					rowList:[ 10, 15, 30, 50, 100, 200 ], 
					toppager : false, //是否在表格顶部也显示分页构件
					pager: "#" + this.pagerId
				})
				if(this.prmNames == undefined){
					//	查询参数信息
					Object.assign(options, {
						prmNames : {
							page : "page", 
							rows : "size", 
							sort : "sd", 
							order : "dir" 
						}
					})
				} else {
					Object.assign(options, {
						prmNames : this.prmNames
					})
				}
			}
		},

		initSorter (options) {
			let sortable = this.sortable

			if(this.sortable) {
				let sortname = this.sortField,
					sortorder = this.sortDir

				Object.assign(options, {
					sortable, 
					sortorder, 
					sortname 
				})
			}
		},
		
		initTreeGrid (options) {
			if(this.treeGrid && options.data){
				let list = [],  
					that = this, 
					treeReader = this.treeReader, 
					setLevelsData = function(pid, data){
						let pdata = data.find(function(p){

							return p[that.idField] == pid
						})

						data.forEach(function(item, index){
							if(item[treeReader.parent_id_field] == pid){
								item[that.idField] = (item[that.idField])
								item[treeReader.parent_id_field] = 
									item[treeReader.parent_id_field] == 0 ? 
										null : (item[treeReader.parent_id_field])
								item[treeReader.expanded_field] = 'true'
								item[treeReader.level_field] = 
									(pdata && pdata[treeReader.level_field] 
											&& pdata[treeReader.level_field] + 1) || 1
								item[treeReader.loaded] = 'true'
								item[treeReader.leaf_field] = 'true'
								if(pdata){
									pdata[treeReader.leaf_field] = 'false'
								}
								item[treeReader.icon_field] = 'glyphicon glyphicon-triangle-right'
								list.push(item)
								//移除当前项
								//let index = data.indexOf(item)
								let tmp = data.concat()
								
								tmp.splice(index, 1)
								//递归获取子节点
								setLevelsData(item[that.idField], data)
							}
						})
					}
					
				setLevelsData(0, options.data)
				//将不存在的节点置为1级
				options.data.forEach(function(item){
					if(list.find(function(sl){
							return sl[that.idField] == item[that.idField]
						}) === null){
						item[treeReader.parent_id_field] = 0
						item[treeReader.leaf_field] = true
						item[treeReader.level_field] = 1
						item[treeReader.loaded] = 'true'
						item[treeReader.icon_field] = 'glyphicon glyphicon-triangle-right'
						list.push(item)
					}
				})
				options.data = list
			}
			Object.assign(options, {
				treeGrid: this.treeGrid,
				ExpandColumn: this.expandColumn,
				ExpandColClick: !!this.expandColumn,
				treeGridModel: this.treeGridModel,
				treeReader: this.treeReader,
				loadonce: this.localModel
			})

		},

		/**
		 *
		 */
		initTemplate (options) {
			let sortable = this.sortable

			Object.assign(options, {
				cmTemplate : {
					sortable, 
					resizable : true, 
					title : false, 
					fixed : false, 
					editable : false, //是否可编辑
					align : "left" 
				}
			})
		},

		initUrl (options) {
			//	设置reader
			//判断是前端排序还是后端排序
			if(Array.isArray(this.datas)){
				let datas = this.datas, 
					str = JSON.stringify(datas), 
					pat = />/g, 
					pat2 = /</g, 
					escapseData = str.replace(pat, '&gt').replace(pat2, '&lt'),
					that = this

				JSON.parse(escapseData).forEach(function(val, index){
					that.$set(that.datas, index, val)
				})
				//this.$set(this.datas, JSON.parse(escapseData))

				Object.assign(options, {
					datatype: 'local',
					data: this.datas,
					localReader : {
						id: this.idField
					}
				})

				this.localModel = true
			} else{
				Object.assign(options, {
					datatype: "json",
					jsonReader : {
						root : "data.data",
						page : "data.page",
						total : function(datas) {
									let count = datas && datas.data && datas.data.count, 
										size = datas && datas.data && datas.data.limit, 
										total = Math.ceil(count / size)
									
									return total
								},
						records : "data.count",
						id : this.idField,
						repeatitems : true//设置此元素为true,将会容许出现重复元素,但是重复的元素无法同时选中
					}, 
					loadComplete : this.onLoad
				})
				let url = this.url

				if(url) {
					Object.assign(options, {
						url
					})
				}

				this.localModel = false
			}
		},
	}
}