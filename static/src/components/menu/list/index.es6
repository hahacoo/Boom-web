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
				result = STI_BASEURL + '/' + currentApp + '/' + this.model.url
			}

			return result
		},

		//选中的样式
		selected(){
			let result = false

			if(this.model.url == currentPage){
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

					if(array.children[i].url == currentPage){
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

	props:['menuData'],

	data(){
		return{
			datas: this.menuData
		}
	},

	created(){
		currentApp = this.$router.currentRoute.path.split('/')[1]
		currentPage = this.$router.currentRoute.path.split('/')[2]
	},

	methods: {
		menuFilters(){
			//找出当前app对应的router的list
			app.apps.forEach(function(val){
				if(val.path == currentApp){
					appList = val
				}
			})

			//过滤router list和权限对应的菜单
			//不停遍历privilege,同时构造菜单的数据结构，没有，就splice掉
			//主要是二级菜单和三级菜单的区别
			// appList.children.forEach(function(routerVal){
			// 	console.log(routerVal)
			// })

			// this.menu = privilege.map(function(val){
			// 	return {
			// 		url: val.menu_path,
			// 		text: val.cn_name,
			// 		children: val.menu
			// 	}
			// })
			// console.log('app:' + currentApp)
			// console.log(this.menu)
		}
	}
}
