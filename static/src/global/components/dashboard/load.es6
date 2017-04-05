/**
 * 生成组件、片段、portals
 * 
 */
import portal from './portal/index'
import * as portals from './registry'

//组件
const COMPONENTS = {
	portal
}

//portals
const PORTALS = []

let keys = Object.keys(portals),
	i = keys.length

while(i--) {

	let view = keys[i],
		portalView = portals[view]

	if(COMPONENTS[view] !== undefined) {

		throw Error(view + '视图已存在！')
	}

	//添加组件
	COMPONENTS[view] = portalView
	//添加portal
	PORTALS.unshift({
		id: view
	})
}

export {
	
	COMPONENTS,
	PORTALS
}