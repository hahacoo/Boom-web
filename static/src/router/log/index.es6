import Logger from 'utils/Logger'

export default function log(to, from, next, store) {

	let logger = new Logger()
	
	logger.time()
	logger.from(from.fullPath)
	logger.to(to.fullPath)
	
	next()
}