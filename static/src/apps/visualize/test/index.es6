import './style'
import template from './view'
import { createVisualize } from 'utils'

export default createVisualize(template, {

	created() {

		console.log('test')
	},

	destroy() {

		console.log('destroy')
	}
})

