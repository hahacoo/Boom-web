/**
 * 基于gridstackjs的dashboard
 *
 * by zhangdi
 */
import 'gridstack/gridstack'
import 'gridstack/gridstack.css'
import { mapGetters, mapActions } from 'vuex'

import './style'
import template from './view'
import portal from './portal/index'
import { COMPONENTS }  from './load'

export default {

	template,

	data: function() {

		return {}
	},

	props: {

		editable: {

			default: false
		},

		portals: {
			type: Array,
			default: function() {
				return []
			}
		},

		//等分列数
		width: {

			default: 12
		},

		//最大行数，默认为无限制
		height: {

			default: 0
		},

		//是否静止
		staticGrid: {

			default: false
		},

		//单位高度
		cellHeight: null,

		//垂直间距
		verticalMargin: {

			default: 20
		},

		//开启浮动，开启浮动之后允许portal被到处放置
		float: {

			default: true
		},

		//是否初始化已存在portal
		auto: {

			default: true
		},

		//是否开启拖拽
		disableDrag: {

			default: false
		},

		//jquery-ui拖拽option
		draggable: {

			type: Object
		},

		//jquery-ui大小缩放option
		resizable: {

			type: Object
		},

		//是否可删除portal
		removable: {

			default: false
		},

		removeTimeout: {

			default: 200
		},

		//是否开启大小缩放
		disableResize: {

			default: false
		},

		//是否允许动态添加portal
		acceptWidgets: {

			default: '.grid-stack-item'
		},

		//是否始终显示大小缩放按钮
		alwaysShowResizeHandle: {

			default: false
		},

		//动画效果开关
		animate: {

			default: true
		},

		//拖拽选择器
		handle: {

			default: '.grid-stack-item-content'
		},

		//拖拽样式，设置handle的情况下会忽略
		handleClass: {

			default: null
		},

		//默认portal样式
		itemClass: {

			default: 'grid-stack-item'
		},

		//最小宽度
		minWidth: {

			default: 768
		},

		//占位符的样式
		placeholderClass: {

			default: 'grid-stack-placeholder'
		},

		//占位符的文字信息
		placeholderText: {

			default: ''
		},

		//排列方式
		rtl: {

			default: 'auto'
		}

	},

	computed: {

		...mapGetters({

			count: 'countGetter',
			portalId: 'portalIdGetter'
		}),

		gridstackClass() {

			return 'grid-stack-' + this.width
		},

		portalsComputed() {

			this.portals.forEach(item => {

				item.editable = this.editable
				if(typeof item._uid === 'undefined') {

					item._uid = this.uid++
				}
				
			})

			return this.portals
		}
	},

	watch: {

		count: function() {

			this.insert(this.portalId)
		}
	},

	components: COMPONENTS,

	methods: {

		/**
		 * 插入portal
		 * @param  {[type]} portalId [description]
		 * @return {[type]}          [description]
		 */
		insert(portalId) {

			this.portals.unshift({
				_uid: undefined,
				id: portalId,
				editable: false,
				x: 0, 
				y: 0, 
				width: 3, 
				height: 3
			})

			this.$nextTick(() => {

				this.grid.makeWidget(this.$refs.gridstack.children[0])
			})
		},

		/**
		 * 根据uid删除portal
		 * @param  {[type]} el [description]
		 * @return {[type]}     [description]
		 */
		remove(el) {

			//删除portal
			this.grid.removeWidget(el, false)
			//删除数据
			this.$remove(this.portals, item => item._uid == el.dataset.uid)
		},

		lock(el, val) {

			this.grid.movable(el, !val)
			this.grid.resizable(el, !val)
			this.grid.locked(el, val)
		}
	},

	created() {

		this.uid = 0
	},

	mounted() {

		let options = {},
			props = Object.keys(this._props),
			l = props.length

		while(l--) {

			props[l] != 'portals' && (options[props[l]] = this[props[l]])
		}

		let container = this.$el,
			height = container.clientHeight,
			cellHeight = this.cellHeight || height / 10

		options.cellHeight = cellHeight

		//初始化布局
		$(this.$refs.gridstack).gridstack(options)

		this.grid = $(this.$refs.gridstack).data('gridstack')
	}
}