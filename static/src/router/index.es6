import CryptoJS from 'crypto-js'

import Router from 'lib/StiRouter'
import store from 'store/index'
import App from 'apps/app'
import HomePage from 'apps/app/home'
import Visualize from 'apps/visualize'
import LoginPage from 'apps/login'
import ErrorPage from 'apps/error'
import filter from './filter'
import log from './log'
import routes from './routes'

let router = new Router()
.register('', App, {
			
	children: [

		{
			path: '',
			component: HomePage,
			meta: {
				requestAuth: true
			}
		},
		...Router.setMetas(routes.apps, {requestAuth: true})
	]
})
.register('/visualize', Visualize, {
			
	children: [

		...Router.setMetas(routes.visualize, {requestAuth: true})
	]
})
.register('/login', LoginPage)
.register('/public', resolve => require(['apps/public'], resolve))
.register('*', ErrorPage)
.plugins(log)
.plugins(filter)

export default router.router
