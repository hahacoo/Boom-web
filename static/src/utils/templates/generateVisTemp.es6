/**
 * 大屏模板生成函数
 * @param  {String} compTemp [description]
 * @param  {[type]} animate  [description]
 * @return {[type]}          [description]
 */
function generateVisTemp(compTemp = '') {

	return `
	<div class="visualize-main">
		${compTemp}
	</div>
	
	`
}

export default generateVisTemp
