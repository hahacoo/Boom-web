/**
 * App入口文件
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, browserHistory} from 'react-router'

import routes from './routes'
import AppHeader from 'bases/components/header/index'

class App extends Component {

	render () {

		return 	<div className='boom-container'>
					<AppHeader />

					<Router routes={routes} history={browserHistory} />
				</div>
	}
}

//挂载到DOM上
render(
		<App />
	, document.getElementById('react-app'))

//开启热替换
if(module.hot) {

	module.hot.accept()
}

