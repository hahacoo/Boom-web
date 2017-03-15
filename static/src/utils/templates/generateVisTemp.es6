/**
 * 大屏模板生成函数
 * @param  {String} compTemp [description]
 * @param  {[type]} animate  [description]
 * @return {[type]}          [description]
 */
function generateVisTemp(compTemp = '', animate = 'zoom') {

	return `
	<transition name="sti-${animate}" mode="out-in" appear>

		<div class="visualize-main">
			${compTemp}
		</div>
	</transition>
	
	`
}

export default generateVisTemp
