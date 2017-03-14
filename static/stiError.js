function StiError(e, filename, functionName, line, col) {

	function errorTitle() {

		var ctitle = document.createElement('span')
		ctitle.textContent = 'STI-ERROR'
		ctitle.style.backgroundColor = '#E36049'
		ctitle.style.color = '#fff'
		ctitle.style.padding = '2px 4px'
		ctitle.style.borderRadius = '2px'

		return ctitle
	}

	function errorFileName(filename) {

		var text = document.createTextNode(' in ' + filename + '\n\n')

		return text
	}

	function errorFileLoc(filename) {

		var location = document.createElement('u')
		location.className = 'console-location'
		location.style.whiteSpace = 'pre'
		location.textContent = filename + '\n'

		return location
	}

	function errorLineCol(line, col) {

		var lineCol = document.createElement('span')
		lineCol.style.opacity = 0.5
		lineCol.style.whiteSpace = 'pre'
		lineCol.textContent = line + ':' + col

		return lineCol
	}

	function errorFuncName(functionName, e) {

		var funcSpan = document.createElement('span')
		funcSpan.style.color = '#E36049'
		funcSpan.style.whiteSpace = 'pre'
		funcSpan.style.padding = '0 10px'
		funcSpan.textContent = '函数名：' + functionName + '   ' + e.toString() +'\n\n'

		return funcSpan
	}

	function errorStack(e) {

		var stackDiv = document.createElement('div')
		stackDiv.style.whiteSpace = 'pre'
		stackDiv.textContent = e.stack

		return stackDiv
	}

	this.error = document.createElement('div')
	this.error.style.whiteSpace = 'pre'
	this.error.style.marginBottom = '20px'
	this.error.appendChild(errorTitle())
	this.error.appendChild(errorFileName(filename))
	this.error.appendChild(errorFileLoc(filename))
	this.error.appendChild(errorLineCol(line, col))
	this.error.appendChild(errorFuncName(functionName, e))
	this.error.appendChild(errorStack(e))
}

function ErrorContainer() {

	var container = document.getElementById('sti-error')

	if(!container) {

		container = document.createElement('div')
		container.id = 'sti-error'
		container.style.color = '#fff'
	}

	this.container = container

	document.body.appendChild(container)
}

ErrorContainer.prototype.log = function(error) {

	this.container.appendChild(error.error)
}

var stiError = function(e, fileName, functionName, line, col) {

	var container = new ErrorContainer()

	container.log(new StiError(e, fileName, functionName, line, col))
}