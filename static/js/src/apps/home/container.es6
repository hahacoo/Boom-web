/**
 * 容器组件
 * 专注于数据变化导致的运行变化
 * 将state，dispatch与展示容器建立联系
 * 底层是通过store.subscribe()从Redux state树中读取部分数据，并通过props传递给展示组件
 * 
 */
import { connect } from 'react-redux'
import { homeChange, homeChangeAsync, homeChangePromise } from 'state/modules/home/actions'
import Home from './index'

/**
 * state到props的映射
 * @param  {[type]} state    store状态
 * @param  {[type]} ownProps 绑定到container上的参数
 * @return {[type]}          传入Home组件的props
 */
const mapStateToProps = (state, ownProps) => {

	return {

		content: state.home
	}
}

/**
 * dispatch到props的映射
 * @param  {[type]} dispatch dispatch方法
 * @param  {[type]} ownProps 绑定到container上的参数
 * @return {[type]}          传入Home组件的props
 */
const mapDispatchToProps = (dispatch, ownProps) => {

	return {

		onClick: () => {

			//sync
			dispatch(homeChange('Boom-App'))
			//thunk
			//dispatch(homeChangeAsync())
			//promise
			//dispatch(homeChangePromise())
		}
	}
}

/**
 * 与组件建立连接
 * @type {[type]}
 */
export default connect(
		mapStateToProps, 
		mapDispatchToProps
	)(Home)

