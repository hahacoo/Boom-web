// import { mapState, mapActions } from 'vuex'
import './style'
import template from './view'
import apps from 'router/routes'

let app = _.cloneDeep(apps)

export default {

	template,

	data(){
		return {
			title: '',
			desc: '',
			currentApp: this.$router.currentRoute.path.split('/')[1],
			currentPage: this.$router.currentRoute.path.split('/')[2],
			navList: []
		}
	},

	watch: {
		//切换路由的时候监听变化，之后调用watch的selected
		'$route'(val){
			this.currentApp = val.path.split('/')[1]
			this.currentPage = val.path.split('/')[2]

			let page = this.findPage()

			this.createNav(page)
		}
	},

	created(){
		//当前的app和菜单页面
		let page = this.findPage()

		this.createNav(page)
	},

	methods: {
		findPage(){
			let list = null,
				that = this

			//找出当前app对应的router的list
			app.apps.forEach((val) => {
				if(val.path == that.currentApp){
					list = val
				}
			})

			let appList = list.children,
				page = null

			//找出当前的page
			appList.forEach((val) => {
				if(val.path == that.currentPage){
					page = val
					//设title和description
					that.title = val.meta.text || ''
					that.desc = val.meta.desc || ''
				}
			})

			return page
		},

		createNav(page){
			this.navList = [{
							text: '首页',
							nav: '',
							index: 0
						}]
			let currentList = this.$router.currentRoute.path.split('/'),
				that = this

			//将''和当前的app过滤
			currentList.splice(0, 2)

			//根据node找url对应的节点
			function findChildUrl(node, url){
				let result = null,
					reg = new RegExp(url, 'g')

				node.forEach((val) => {
					if(reg.test(val.path)){
						result = val
					}
				})

				return result
			}

			let tmp = {
				children: [page]
			}, node = null

			currentList.forEach((Cval, Cind) => {
				node = findChildUrl(tmp.children, Cval)
				that.navList.push({
					text: node.meta.text,
					nav: node.path,
					index: Cind + 1
				})
				tmp.children = node.children
			})
		},

		//导航事件
		direction(index) {
			let path = ''

			if(index == 0){
				path = '/'
			} else{
				path = '/' + this.currentApp
			}

			for(let i = 1; i <= index; i++){
				path += '/' + this.navList[i].nav
			}

			this.$router.push(path)
		},
	}
}