/**
 * (c) Copyright 2016 STI eXtrem Using技术小组
 * http://www.stixu.com
 * 规则校验主组件,依赖于jquery
 * @class ValidRule
 * @desc validator 的配置及方法，包括动态添加，移除规则
 * @requires jquery
 * @requires jquery-validation
 * @requires Validator
 * @param {String} [validFor] - 要验证的控件名
 * @param {String} [name] - 规则名称
 * @param {Object} [params] - 参数
 * @param {String} [message] - 错误提示信息
 */

const template = '<div class="sti-validator-rule" :valid-for="validFor"></div>'

export default {

	template,

	props : {
		/**
		* 验证的控件
		* @memberof ValidRule.prototype
			* @desc 要验证的控件名
		*/
		validFor : {
			type : String,
			required : true
		},
		/**
		* @memberof ValidRule.prototype
		* @desc 验证规则名
		*/
		name : {
			type : String,
			required : true
		},
		/**
		 * @memberof ValidRule.prototype
		 * @desc 验证所需参数
		 */
		params : [ String, Object, Function, Boolean, Array ],
		/**
		 * @memberof ValidRule.prototype
		 * @desc 错误提示信息
		 */
		message : [ String, Object, Function ]

	},

	mounted () {

		let _parent = this.$parent

		if(_parent.tagName === 'VALIDATOR') {
			let rule = {},
				message = {}

			//	添加规则
			if(this.name) {

                let params = !this.params ? true : this.params

				_parent.addRule(this.validFor, this.name, params, this.message)
			}
		} else {

			throw Error('parent must be validator')
		}
	}

}
