import Vue from 'vue'
import { mapState } from 'vuex'

let defaultTemp = `
<div class="sti-web" :class="theme">
	
	<router-view></router-view>
	<sti-console></sti-console>
</div>
`

export default class StiApp {

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