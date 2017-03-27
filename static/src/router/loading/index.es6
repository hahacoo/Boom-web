import Vue from 'vue'

import template from './view'

let Loading = Vue.extend({

	template,

	destroyed() {

	}
})

let loading

export function begin() {

	loading = new Loading()
	loading.$mount('#sti-loading')
}

export function end() {

	loading.$destroy()
}