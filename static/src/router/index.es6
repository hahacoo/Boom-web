import CryptoJS from 'crypto-js'

import Router from 'lib/StiRouter'
import store from 'store/index'
import App from 'apps/app'
import HomePage from 'apps/app/home'
import Visualize from 'apps/visualize'
import VisHomePage from 'apps/visualize/home'
import LoginPage from 'apps/login'
import ErrorPage from 'apps/error'
import routes from './routes'

import log from './log'
import filter from './filter'
import { before as paramBefore } from './param'
import { begin as loadingBegin, end as loadingEnd } from './loading'

let router = new Router()
.register('', App, {
			
	children: [

		{
			path: '',
			name: 'ahome',
			component: HomePage,
			meta: {
				requestAuth: true,
				text: '首页',
			}
		},
		...Router.setMetas(routes.apps, {

			requestAuth: true, 
			progress: {

				color: '#455A64'
			}
		})
	]
})
.register('/visualize', Visualize, {
			
	children: [
		{
			path: '',
			name: 'vhome',
			component: VisHomePage,
			meta: {
				requestAuth: true,
				text: '大屏首页',
			}
		},
		...Router.setMetas(routes.visualize, {

			requestAuth: true, 
			progress: {

				color: '#ccc'
			}
		})
	]
})
.register('/login', LoginPage)
.register('/public', resolve => require(['apps/public'], resolve))
.register('*', ErrorPage, {	name: 'error' })
.before(log)
.before(filter)
.before(paramBefore)

export default router.router

