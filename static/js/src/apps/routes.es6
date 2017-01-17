import React from 'react'
import { Route, IndexRoute} from 'react-router'

//引入容器组件
import Home from './home/container'

export default (
	<Route path='boom'>
							
		<IndexRoute component={Home}/>
	</Route>
)