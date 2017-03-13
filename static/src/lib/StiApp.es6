import Vue from 'vue'
import { mapState } from 'vuex'

let defaultTemp = `
<div class="sti-app" :class="theme">
	
	<router-view></router-view>
</div>
`

export default class StiApp {

	constructor({

		el = '#sti-app',
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