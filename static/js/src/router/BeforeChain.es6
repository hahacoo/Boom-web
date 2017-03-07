//全局前置路由过滤器
export const beforeEachFilters = []

/**
 * 过滤器创建函数
 * @param  {[type]} filter 过滤函数
 * @return {[type]}        [description]
 */
export function loadFilter(filter) {

	beforeEachFilters.push(filter)
}