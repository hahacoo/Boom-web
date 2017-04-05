import template from 'text!./view.html'

import StiVue from 'module/sti-vue'

import $ from 'jquery'

export default {

	template,

	components: {
        map: StiVue.map,
    }	
}