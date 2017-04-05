/**
 * StiVue
 * 
 */
import Vue from 'vue'
import { mapState } from 'vuex'

import App from './modules/App'
import Visualize from './modules/Visualize'
import Component from './modules/Component'

let defaultTemp

if(process.env.NODE_ENV !== 'production') {

	defaultTemp = `
<div class="sti-web" :class="theme">
	
	<sti-progress></sti-progress>
	<router-view></router-view>
	<sti-search></sti-search>
	<sti-console></sti-console>
</div>
`
} else {

	defaultTemp = `
<div class="sti-web" :class="theme">
	
	<sti-progress></sti-progress>
	<router-view></router-view>
	<sti-search></sti-search>
</div>
`
}

class StiVue {

	constructor({

		el = '#sti-web',
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

StiVue.App = App

StiVue.Visualize = Visualize

StiVue.Component = Component

export default StiVue