/**
 * babel-plugin-try-catch
 * 为function提供统一异常处理
 * 
 * by zhangdi
 */
let template = require('babel-template'),
	functionNameHelper = require('babel-helper-function-name')

const wrapFunction = template(`{
	try {
		BODY
	} catch(e) {
	    ERROR_HANDLER(e, FILENAME, FUNCTION_NAME, LINE, COLUMN)
	}
}`)

const getFunctionName = function(path) {

	if(path.node.id && path.node.id.name) {

		return path.node.id.name

	}

	if(path.node.key && path.node.key.name) {

		return path.node.key.name
	}

	return 'anonymous function'	
}

const skip = function (path, state) {

	if(!errorHandler || state.end) {

		return true	
	}

	if(!path.node.loc) {

		var name = getFunctionName(path)

		//排除webpack生成代码
		if(name.slice(0, 8) === '_interop') {

			return true
		}
	}

	return false
}

let errorHandler = '',
	filename = 'unknown'

module.exports = function (babel) {

	let t = babel.types

	return {

		pre(file) {

			errorHandler = this.opts.errorHandler

			filename = file.opts.filename
		},

		visitor: {

			//函数节点
			'Function|ClassMethod': {

				exit(path, state) {

					functionNameHelper(path)

					if (skip(path, state)) {

	                    return
	                }

	                //跳过空函数
					const body = path.node.body.body
	                if (body.length === 0) {

	                    return
	                }

	                let functionName = getFunctionName(path)

	                const loc = path.node.loc || path.node.body.loc

	                path.get('body').replaceWith(wrapFunction({
	                    BODY: body,
	                    FILENAME: t.StringLiteral(filename),
	                    FUNCTION_NAME: t.StringLiteral(functionName),
	                    LINE: t.NumericLiteral(1),
	                    COLUMN: t.NumericLiteral(2),
	                    ERROR_HANDLER: t.identifier(errorHandler)
	                }))
				}
			}
		}
	};
}