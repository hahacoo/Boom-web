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
			index: 0,
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

		focus() {

			this.focused = true
		},

		over($index) {

			this.index = $index
		},

		up() {

			let len = this.contents.length

			if(len == 0) {

				return
			}

			if(this.index == 0) {

				return this.index = len - 1
			}

			this.index--
		},

		down() {

			let len = this.contents.length

			if(len == 0) {

				return
			}

			if(this.index == len - 1) {

				return this.index = 0
			}

			this.index++
		},

		search() {

			//TODO查询
			this.contents = [ "xsd1", "xsd2", "xsd3", "xsd4", "xsd5", "xsd6" ]
		}
	},

	created() {

		let that = this

		document.body.addEventListener('keydown', function(e) {

			if(e.ctrlKey && e.keyCode == that.keyCode) {

				that.active = !that.active
			}
		})
	}
}