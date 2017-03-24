/**
 * 可拖拽调整宽高
 * @param  {[type]} elementToDrag [description]
 * @param  {[type]} event         [description]
 * @param  {[type]} moveHandler   [description]
 * @param  {[type]} upHandler     [description]
 * @return {[type]}               [description]
 */
export default function pull(elementToDrag, event, moveHandler, upHandler) {
    //初始化鼠标位置
    let startX = event.clientX, 
        startY = event.clientY

    //事件绑定
    if(document.addEventListener) {

        document.addEventListener("mousemove", moveFn, true)
        document.addEventListener("mouseup", upFn, true)
    } else if(document.attachEvent) { 

        elementToDrag.setCapture()
        elementToDrag.attachEvent("onmousemove", moveFn)
        elementToDrag.attachEvent("onmouseup", upFn)
        elementToDrag.attachEvent("onlosecapture", upFn)
    } else {

        let oldmovehandler = document.onmousemove
        let olduphandler = document.onmouseup

        document.onmousemove = moveFn
        document.onmouseup = upFn
    }

    if(event.stopPropagation) {

        event.stopPropagation()
    } else {

        event.cancelBubble = true
    }

    if(event.preventDefault) {

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

        let endX = e.clientX,
            endY = e.clientY

        //计算鼠标移动的距离
        let moveX = endX - startX,
            moveY = endY - startY

        moveHandler(moveX, moveY, e)

        if(e.stopPropagation) {

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

        if(document.removeEventListener) {

            document.removeEventListener("mouseup", upFn, true)
            document.removeEventListener("mousemove", moveFn, true)
        } else if(document.detachEvent) {

            elementToDrag.detachEvent("onlosecapture", upFn)
            elementToDrag.detachEvent("onmouseup", upFn)
            elementToDrag.detachEvent("onmousemove", moveFn)
            elementToDrag.releaseCapture( )
        } else { 

            document.onmouseup = upFn
            document.onmousemove = moveFn
        }

        upHandler && upHandler(e)

        if(e.stopPropagation) {

             e.stopPropagation( )
        } else {

            e.cancelBubble = true
        }
    }
}