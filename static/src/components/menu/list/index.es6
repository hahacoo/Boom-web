/**
 * 配置二级菜单：不设置component
 * 三级菜单：通过menu_parent来指定二级菜单的path
 * app首页：path为空
 */
import './style'
import view from './view'
import template from './template'
import app from 'router/routes'
import { STI_BASEURL } from 'constant'
import Vue from 'vue'

let privilege = [{
	menu_path: 'important',
	menu: [],
	desc: '这个是important',
	cn_name: '重保单位'
}, {
	menu_path: 'user',
	menu: [],
	desc: '这个是user',
	cn_name: '用户管理'
}, {
	menu_path: 'third111',
	menu: [],
	desc: '这个是三级菜单111',
	cn_name: '三级菜单111'
}, {
	menu_path: 'third222',
	menu: [],
	desc: '这个是三级菜单222',
	cn_name: '三级菜单222'
}]

let currentApp = null,
	appList = null,
	currentPage = null

Vue.component('item', {

	template,

	props: {
		model: Object
	},

	data() {
		return {
			open: false,
		}
	},

	computed: {
		//判断是不是有下一级
		isFolder() {
			return this.model.children && this.model.children.length
		},

		urlModify(){
			let result = null

			//如果有下一级，那么本身就没有href
			if(this.isFolder){
				result = 'javascript:void(0)'
			} else{
				result = STI_BASEURL + '/' + currentApp + '/' + this.model.path
			}

			return result
		},

		//选中的样式
		selected(){
			let result = false

			if(this.model.path == currentPage){
				result = true
			} else{
				result = false
			}

			return result
		}
	},

	created(){
		this.isOpen(this.model)
	},

	methods: {
		//当children是当前的page时，该二级菜单要展开
		isOpen(array){

			if(this.isFolder){
				for(let i = 0; i < array.children.length; i++){
					if(array.children && array.children.length > 0){
						for(let j = 0; j < array.children.length; j++){
							this.isOpen(array.children[j])
						}
					}

					if(array.children[i].path == currentPage){
						this.open = true
						break
					}
				}
			}
		},

		toggle() {
			if (this.isFolder) {
				this.open = !this.open
			}
		}
	}
})

export default {

	template: view,

	data(){
		return{
			datas: [],
			show: false
		}
	},

	created(){
		currentApp = this.$router.currentRoute.path.split('/')[1]
		currentPage = this.$router.currentRoute.path.split('/')[2]

		this.findAppList()
		let menuList = this.menuFilters()

		this.list2Tree(menuList)
	},

	methods: {
		findAppList(){
			//找出当前app对应的router的list
			app.apps.forEach(function(val){
				if(val.path == currentApp){
					appList = val
				}
			})
		},

		menuFilters(){
			//过滤router list和权限对应的菜单
			//不停遍历privilege

			let arr = [],
				tmpList = appList.children

			for(let i = 0; i < tmpList.length; i++){
				//对应app的首页或者二级菜单都不用过滤
				if(tmpList[i].path == '') {
					continue
				}else if(tmpList[i].component == undefined){
					arr.push(tmpList[i])
				} else{
					for(let j = 0; j < privilege.length; j++){
						if(privilege[j].menu_path == tmpList[i].path){
							arr.push(tmpList[i])
							continue
						}
					}
				}
			}

			return arr
		},

		list2Tree(list){
			let result = {},
				visitedMAP = new Map(),
				obj = {
					children: []}

			//深度优先
			function array2Object(node){
				node.children = []
				for(let i = 0; i < list.length; i++){
					//判断是否访问过以及是不是需要找的点
					if(list[i].menu_parent == node.path 
						&& !visitedMAP[list[i]]){
						visitedMAP.set(list[i], true)
						node.children.push(list[i])
						array2Object(list[i])
					}
				}
			}
			array2Object(obj)

			//这个函数还需要修改
			function deleteEmptyMenu(node){
				for (let i = 0; i < node.children.length; i++) {
					if(node.children[i].component==undefined 
						&& (node.children[i].children 
							&& node.children[i].length==0)){
						node.children.splice(i, 1)
					} else{
						deleteEmptyMenu(node.children[i])
					}
				}
			}

			console.log(obj)

			deleteEmptyMenu(obj)
			this.datas = obj.children
			//this.$set('datas', obj.children)
			this.show = true
		}
	}
}
