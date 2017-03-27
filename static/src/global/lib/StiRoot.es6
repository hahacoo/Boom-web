import Vue from 'vue'
import { mapState } from 'vuex'

let defaultTemp

if(process.env.NODE_ENV !== 'production') {

	defaultTemp = `
<div class="sti-web" :class="theme">
	
	<sti-progress></sti-progress>
	<router-view></router-view>
	<sti-console></sti-console>
</div>
`
} else {

	defaultTemp = `
<div class="sti-web" :class="theme">
	
	<sti-progress></sti-progress>
	<router-view></router-view>
</div>
`
}

export default class StiRoot {

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