/**
 * App入口文件
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory} from 'react-router'

import routes from './routes'
import store from 'state/store'
import AppHeader from 'bases/components/header/index'

class App extends Component {

	render () {

		return 	<div className='boom-container'>
					<AppHeader />

					<Router routes={routes} history={browserHistory} />
				</div>
	}
}

//挂载到DOM上，将Redux绑定到React，让所有容器组件可以访问store
render(
		<Provider store={store}>
			<App />
		</Provider>
	, document.getElementById('react-app'))

//开启热替换
if(module.hot) {
	
	module.hot.accept()
}

