import React from 'react'
import { Route, IndexRoute} from 'react-router'

import Home from './home'

export default (
	<Route path='boom'>
							
		<IndexRoute component={Home}/>
	</Route>
)