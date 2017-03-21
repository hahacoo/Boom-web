/**
 * 可拖动函数
 * @param  {[type]} elementToDrag [description]
 * @param  {[type]} e         	  [description]
 * @param  {[type]} moveHandler   [description]
 * @param  {[type]} upHandler     [description]
 * @return {[type]}               [description]
 */
export default function drag(elementToDrag, event, moveHandler, upHandler) {
	
	//获取窗口大小
	let windowWidth = document.body.clientWidth,
		windowHeight = document.body.clientHeight

	//记录初始化状态
	let startX = event.clientX, 
		startY = event.clientY
	let origX = elementToDrag.offsetLeft, 
		origY = elementToDrag.offsetTop
	let deltaX = startX - origX, 
		deltaY = startY - origY

	//事件绑定
	if(document.addEventListener) {

		document.addEventListener("mousemove", moveFn, true)
		document.addEventListener("mouseup", upFn, true)
	} else if(document.attachEvent) { 

		elementToDrag.setCapture( )
		elementToDrag.attachEvent("onmousemove", moveFn)
		elementToDrag.attachEvent("onmouseup", upFn)
		elementToDrag.attachEvent("onlosecapture", upFn)
	} else {

		let oldmovehandler = document.onmousemove
		let olduphandler = document.onmouseup

		document.onmousemove = moveFn
		document.onmouseup = upFn
	}

	if (event.stopPropagation) {

		event.stopPropagation()
	} else {

		event.cancelBubble = true  
	}

	if (event.preventDefault) {

		event.preventDefault()
	} else {

		event.returnValue = false
	}

	/**
	* 鼠标移动事件
	* @param  {[type]} e [description]
	* @return {[type]}   [description]
	*/
	function moveFn(e) {

		let wleft = e.clientX - deltaX,
			wtop = e.clientY - deltaY

		if(wleft > 0) {
			//屏幕右端
			let maxLeft = windowWidth - elementToDrag.offsetWidth

			elementToDrag.style.left = (wleft > maxLeft ? maxLeft : wleft) + "px"
		} else {

			//屏幕左端
			elementToDrag.style.left =  "0px"
		}

		if(wtop > 0) {
			//屏幕底端
			let maxTop = windowHeight - elementToDrag.offsetHeight

			elementToDrag.style.top = (wtop > maxTop ? maxTop : wtop) + "px"
		} else {
			//屏幕顶端
			elementToDrag.style.top = "0px"
		}

			moveHandler && moveHandler(e, startX, startY)

		if (e.stopPropagation) {

			e.stopPropagation()
		} else {

			e.cancelBubble = true  
		}              
	}

	/**
	* 鼠标抬起事件
	* @param  {[type]} e [description]
	* @return {[type]}   [description]
	*/
	function upFn(e) {

		let posTop = +elementToDrag.style.top.slice(0, -2),
			posLeft = +elementToDrag.style.left.slice(0, -2)

		upHandler && upHandler(
			e, 
			posTop, 
			posLeft
		)

		if (document.removeEventListener) {

			document.removeEventListener("mouseup", upFn, true)
			document.removeEventListener("mousemove", moveFn, true)
		}else if (document.detachEvent) {

			elementToDrag.detachEvent("onlosecapture", upFn)
			elementToDrag.detachEvent("onmouseup", upFn)
			elementToDrag.detachEvent("onmousemove", moveFn)
			elementToDrag.releaseCapture()
		}else { 

			document.onmouseup = upFn
			document.onmousemove = moveFn
		}

		if (e.stopPropagation) {

			e.stopPropagation()
		} else {

			e.cancelBubble = true
		}
	}	
}