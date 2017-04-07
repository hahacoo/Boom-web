/**
 * StiVue
 * 
 */
import Vue from 'vue'
import { mapState } from 'vuex'

import App from './modules/App'
import Component from './modules/Component'

let defaultTemp

if(process.env.NODE_ENV !== 'production') {

	defaultTemp = `
<div class="boom-web" :class="theme">
	
	<boom-progress></boom-progress>
	<router-view></router-view>
	<boom-search></boom-search>
	<boom-console></boom-console>
	<boom-loading></boom-loading>
</div>
`
} else {

	defaultTemp = `
<div class="boom-web" :class="theme">
	
	<boom-progress></boom-progress>
	<router-view></router-view>
	<boom-search></boom-search>
	<boom-loading></boom-loading>
</div>
`
}

class BoomVue {

	constructor({

		el = '#boom-web',
		template = defaultTemp,
		plugins = []
	} = {}, store, router) {

		plugins.forEach(plugin => {

			Vue.use(plugin)
		})

		this.app = new Vue({

			el,
			template,
			store,
			router,
			computed: {

				...mapState({

					theme: state => state.theme,
					locale: state => state.locale
				})
			}
		})
	}
}

BoomVue.App = App

BoomVue.Component = Component

export default BoomVue