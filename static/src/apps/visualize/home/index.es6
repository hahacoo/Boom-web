import './style'
import template from './view'

import { createVisualize } from 'utils/stiBuilder'

export default createVisualize(template, 'fade', {

	mounted() {

		console.log(1)
	}
})

