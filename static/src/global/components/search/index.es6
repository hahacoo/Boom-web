import './style'
import template from './view'

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
		}
	},

	methods: {

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
			this.contents = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
		}
	},

	created() {

		let that = this

		this.$subscribe('search.open', () => this.active = true)

		document.body.addEventListener('keydown', function(e) {

			if(e.ctrlKey && e.keyCode == that.keyCode) {

				console.log('xx')

				that.active = !that.active
			}
		})
	}
}