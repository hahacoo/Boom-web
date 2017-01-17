/**
 * Home展示组件
 * 只关注页面展示，不关心数据的来源
 * 
 */
import React, { PropTypes } from 'react'

/**
 * 函数型组件
 * 只关注props变化，不保存state
 * 
 * @param  {[type]} options.content 显示内容
 * @param  {[type]} options.onClick 点击事件
 * @return {[type]}                 [description]
 */
const Home = ({ content, onClick }) => {

	let style = {
			'marginTop': '100px'
		}

	return	<div className='container'>

				<h1 style={style} onClick={onClick}>
					{content}
				</h1>
			</div>
}

Home.propsTypes = {

	content: PropTypes.string.isRequired
}

export default Home
