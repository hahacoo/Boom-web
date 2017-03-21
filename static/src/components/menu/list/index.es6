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

//菜单权限同privilege格式
let privilege = [{
	menu_path: 'important'
}, {
	menu_path: 'user'
}, {
	menu_path: 'third111'
}, {
	menu_path: 'third222'
}, {
	menu_path: 'vali'
}]

let currentApp = null,
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
		},

		firstLine(){
			return this.model.menu_parent == undefined ? true : false
		},

		iconShow(){
			return this.firstLine?this.model.menu_icon:''
		}
	},

	filters:{
		arrowFilter(val){
			return val?'fa-angle-down':'fa-angle-left'
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
			} else{
				this.$router.push(this.model.path)
			}
		}
	}
})

//menu组件入口
export default {
	props: ['unfold'],

	template: view,

	data(){
		return{
			datas: [],
			show: false
		}
	},

	watch:{
		unfold(val){
			console.log(val)
		}
	},

	created(){
		//当前的app和菜单页面
		currentApp = this.$router.currentRoute.path.split('/')[1]
		currentPage = this.$router.currentRoute.path.split('/')[2]

		let appList, menuList

		appList = this.findAppList()

		//不开启菜单过滤
		this.datas = this.list2Tree(appList.children)
		
		//开启菜单过滤
		// menuList = this.menuFilters(appList)
		// this.datas = this.list2Tree(menuList)

		//this.$set('datas', obj.children)
		this.show = true
	},

	methods: {
		findAppList(){
			let list = null

			//找出当前app对应的router的list
			app.apps.forEach(function(val){
				if(val.path == currentApp){
					list = val
				}
			})

			return list
		},

		menuFilters(appList){
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
					children: [],
					level: 0}
			//level这个字段用来标识是第几层，方便左缩进

			//深度优先
			function array2Object(node){
				node.children = []
				for(let i = 0; i < list.length; i++){
					//判断是否访问过以及是不是需要找的点
					if(list[i].menu_parent == node.path 
						&& !visitedMAP[list[i]]){
						list[i].level = node.level + 1
						visitedMAP.set(list[i], true)
						node.children.push(list[i])
						array2Object(list[i])
					}
				}
			}
			array2Object(obj)

			//去掉没有子菜单的空二级菜单
			function deleteEmptyMenu(node){
				let ifDeleteChildren = true,
					ifDeleteItself = true

				for (let i = 0; i < node.children.length; i++) {
					if(node.children[i].component == undefined){
						//该菜单有子菜单，非页面
						if(node.children[i].children == undefined 
							|| (node.children[i].children 
								&& node.children[i].children.length == 0)){
							//子节点都是空的，同时没有component，那这个菜单就要删掉
							ifDeleteChildren = true
						} else{
							//有子节点，但是还需要通过子节点来判断是不是要删
							ifDeleteChildren = deleteEmptyMenu(node.children[i])
						}
					} else{
						//有component，肯定是叶子节点
						ifDeleteChildren = false
					}

					if(ifDeleteChildren){
						node.children.splice(i, 1)
						i--
					}

					ifDeleteItself = ifDeleteItself & ifDeleteChildren
				}

				return ifDeleteItself
			}

			deleteEmptyMenu(obj)

			return obj.children
		},

		clickBtn(item) {
			if (item.children.length == 0) {
				this.$router.push(item.path)
			}
			//else要弹窗
		}
	}
}
