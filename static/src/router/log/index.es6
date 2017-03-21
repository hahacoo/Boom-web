import { RouterLogger } from 'utils/Logger'

export default function log(to, from, store) {

	let logger = new RouterLogger()
	
	logger.path(to.fullPath)
	logger.app(to.meta.appName || '匿名组件')
}