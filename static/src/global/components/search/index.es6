import './style'
import template from './view'
import { highlight } from 'filters'

export default {
	
	template,

	data() {

		return {

			active: false,
			focused: false,
			param: '',
			contents: []
		}
	},

	props: {

		keyCode: {

			default: 81 //Q按键
		}
	},

	watch: {

		active() {

			this.param = ''
			this.contents = []
			this.focused = false
		},

		param(value) {

			this.search(value)
		}
	},

	computed: {

		hlContents() {

			return this.contents.map(content => {

				return this.highlight(content, this.param)
			})
		}
	},

	methods: {

		highlight,

		open() {

			this.param = ''
			this.active = true
		},

		close() {

			this.param = ''
			this.active = false
		},

		focus() {

			this.focused = true
		},

		search() {

			//TODO查询
			this.contents = [ "xsd1", "xsd2" ]
		}
	},

	created() {

		let that = this

		this.$subscribe('search.open', () => this.active = true)

		document.body.addEventListener('keydown', function(e) {

			if(e.ctrlKey && e.keyCode == that.keyCode) {

				that.active = !that.active
			}
		})
	}
}