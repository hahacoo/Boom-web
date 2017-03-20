import { RouterLogger } from 'utils/Logger'
import Console from 'utils/Console'

export default function log(to, from, store) {

	let logger = new RouterLogger({

		output: new Console('route')
	})
	
	logger.path(to.fullPath)
	logger.app(to.meta.appName || '匿名组件')
}