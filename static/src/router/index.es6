import CryptoJS from 'crypto-js'

import Router from 'lib/BoomRouter'
import store from 'store/index'
import App from 'apps/app'
import HomePage from 'apps/app/home'
import LoginPage from 'apps/login'
import ErrorPage from 'apps/error'
import routes from './routes'

import log from './log'
import filter from './filter'
import { before as paramBefore } from './param'

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
.register('/login', LoginPage)
.register('/public', resolve => require(['apps/public'], resolve))
.register('/operate', resolve => require(['apps/operate'], resolve))
.register('*', ErrorPage, {	name: 'error' })
.before(log)
.before(filter)
.before(paramBefore)

export default router.router

