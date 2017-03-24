import './style'
import template from './view'

export default {

	template,

	data() {

		return {

			clicked: false,

			transformOrigin: '50% 50%'
		}
	},

	props: {

		title: String,

		subTitle: String,

		desc: String,

		path: String,

		withHover: [ Boolean, String ]
	},

	methods: {

		click() {

			this.$router.push({

				path: this.path
			})

			// let rect = this.$el.getBoundingClientRect(),
			// 	x = rect.left,
			// 	y = rect.top,
			// 	width = rect.width,
			// 	height = rect.height

			// let p = 2

			// this.clicked = true

			// this.transformOrigin = [ x + width / p + 'px', y + height + 'px' ].join(' ')

		}
	},

	mounted() {

		let mask = this.$refs.mask

		mask.addEventListener('animationend', () => {

			this.clicked = false
		})
	}
}