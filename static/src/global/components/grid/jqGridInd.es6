/*
 * (c) Copyright 2016 STI eXtrem Using技术小组
 * http://www.stixu.com
 */
// import $ from 'jquery'
import 'jqGrid/css/ui.jqgrid-bootstrap.css'
import 'jqGridjs'

import store from 'store'
import template from './jqGrid.html'
import { modal } from 'lib/StiStrap'
import init from './init'
import events from './event'
import props from './props'
import './style'

//	设置样式
$.jgrid.defaults.styleUI = 'Bootstrap'
$.jgrid.styleUI.Bootstrap.base.rowTable = "table table-bordered table-striped"

//cn的国际化某些还是英文，需要自行改为中文
let localObj = {
		nextPage: '下一页',
		lastPage: '最后一页',
		previousPage: '前一页',
		firstPage: '第一页'
	}

//	创建jqGrid组件
let jqGrid = {

	template,

	mixins: [ init, events, props ],

	created () {
		//	设置标记
		this.tagName = 'JQ_GRID'
		this.readySize = 0
		// 设置过滤后的数据
		this.selectLen = 0
		this.filterLen = 0
		this.rawDataSet = []
	},

	components : {
		stiModal : modal
	},

	data () {
		return {
			colModel : [],
			showDialog : false,
			localModel: true,
			showColCount: 0
		}
	},

	watch: {
		colModel: {
			deep: true,
			handler: function(val, oldval){
				let that = this

				this.showColCount = 0
				val.forEach(function(value, ind, arr){
					if(value.shown == true) {
						that.showColCount++
					}
				})
			}
		}
	},

	computed : {

		pagerId () {
			return this.id + '_PAGER'
		},

		sortDir () {
			return this.sortAsc ? 'asc' : 'desc'
		},

		lastHeight () {
			if(this.height !== 'auto') {
				return parseInt(this.height)
			}

			return this.height
		},

		//vue2.0的filter用不上isCheckable，需要自己过滤
		listColModel (){
			let arr = this.colModel.filter(function(val){
					
					return val.choosable
				})

			return arr
		}

	},

	methods : {

		cancel () {
			let col = this.view.jqGrid('getGridParam', 'colModel'),
				that = this

			//取消的时候，选择项跟原先一样
			col.forEach(function(val){
				that.colModel.forEach(function(valselect){
					if(valselect.name == val.name){
						if(val.hidden == false){
							valselect.shown = true
						} else{
							valselect.shown = false
						}
					}
				})
			})

			this.showDialog = false
		},

		/**
		 * 确认此列是否可选择
		 */
		// isCheckable (item) {
		// 	return item.choosable
		// },

		/**
		 * 确定
		 */
		sure () {
			let width = this.view.jqGrid('getGridParam', 'width'),
				hidden = [],
				shown  = []

			this.colModel.forEach(item => {
				if(item.shown) {
					shown.push(item.name)
				} else {
					hidden.push(item.name)
				}
			})
			this.showCol(shown)
			this.hideCol(hidden)
			this.showDialog = false

			this.resizeGridWidth(width)
		},

		/**
		 * 添加字段定义
		 */
		receive () {
			this.readySize ++
			if(this.readySize == this.colSize) {
				let children = this.$children

				this.$children.forEach( item => {
					if(item.tagName === 'JQ_COL') {
						this.colModel.push(item.define)
					}
				})
				this.colModel.sort((a, b) => a.order - b.order)
				this.$nextTick(() => {

					require(['jqGrid/js/i18n/grid.locale-' + store.state.locale], () => {

						this.render()
					})
				})
			}
		},

		resizeGridWidth (width){
			this.view.jqGrid('setGridWidth', width, true)
		},

		/**
		 * 隐藏选择的列
		 */
		hideCol (cols) {
			if($.type(cols) === 'string') {
				this.view.jqGrid('hideCol', [cols])
			}
			if($.type(cols) === 'array') {
				this.view.jqGrid('hideCol', cols)
			}
		},

		/**
		 * 显示选择的列
		 */
		showCol (cols) {
			if($.type(cols) === 'string') {
				this.view.jqGrid('showCol', [cols])
			}
			if($.type(cols) === 'array') {
				this.view.jqGrid('showCol', cols)
			}
		},

		i18nCNAdd (){
			$('.sti-jq-grid .glyphicon-backward').parent().attr('title', localObj.previousPage) 
			$('.sti-jq-grid .glyphicon-step-backward').parent().attr('title', localObj.firstPage) 
			$('.sti-jq-grid .glyphicon-forward').parent().attr('title', localObj.nextPage) 
			$('.sti-jq-grid .glyphicon-step-forward').parent().attr('title', localObj.lastPage) 
		}
	},

	mounted() {
		let that = this

		$(window).resize(function() {
			let grid = $('.sti-jq-grid #gbox_' + that.id).parent(),
				width = grid.width()

			that.resizeGridWidth(width)
		})
	}
}

// 导出的名称无所谓
export default jqGrid