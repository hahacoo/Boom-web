/**
 * (c) Copyright 2016 STI eXtrem Using技术小组
 * http://www.stixu.com
 * 规则校验主组件,依赖于jquery
 * @class Validator
 * @desc validator 的配置及方法，包括动态添加，移除规则
 * @requires jquery
 * @requires jquery-validation
 * @requires valid-rule
 * @param {String} [form=form] - 要验证的表单ID
 * @param {Number} [ruleSize=0] - 规则数量
 * @param {Boolean} [debug=false] - 是否为调试状态，默认false
 */

const template = '<div class="sti-validator"> <slot></slot> </div>'

export default {

  template,

  props :

  {
        /**
       * 需要校验的表单，目前只支持校验表单，也就是说，所有的校验内容必须放在表单中
       * @memberof Validator.prototype
       * @desc 必须满足css选择符规范，如'#form',如果没有显式指定，则对容器内的所有表单进行校验
       */
        form : {
            type : String,
            required : false,
            default () {
                return 'form'
            }
        },
      /**
       * valid-rule 数量
       * @memberof Validator.prototype
       * @desc validator 下valid-rule声明的数量
       */
        ruleSize: {
            type: Number
        },
      /**
       * 是否为调试状态，默认为false
       * @memberof Validator.prototype
       */
        debug: {
            type: Boolean,
            default(){
                return false 
            }
        }
  },

    /**
     * 设置验证规则
     */
    created () {
        this.tagName = 'VALIDATOR'
    },

    data () {
        //    #https://jqueryvalidation.org/validate/
        return {
            rules : {},
            messages : {}
        }
    },
    mounted () {

        if(this.ruleSize == 0){
            $(this.form, this.$el).validate()
        }
    },
    methods:{
        /**
         * @function addRule
         * @desc 添加规则
         * @memberof Validator
         * @param {String} fieldName 字段名
         * @param {String} ruleName 规则名称
         * @param {Object} rule 规则验证参数
         * @param {String} message 错误信息的提示
         */
        addRule (fieldName, ruleName, rule, message) {
            if(this.rules[fieldName]) {
                this.rules[fieldName][ruleName] = rule
            }

            if(rule) {
               this.rules[fieldName] = {[ruleName]: rule}
            }

            //  判断是否有提示信息
            if(message) {
                if(this.messages[fieldName]) {
                    this.messages[fieldName][ruleName] = message
                } else {
                    this.messages[fieldName] = {[ruleName] : message}
                }
            }
            if(Object.keys(this.rules).length === this.ruleSize) {
                this.validate()
            }
        },
        /**
         * 移除规则
         * @function removeRule
         * @memberof Validator
         * @param {String} fieldName 字段名称
         * @param {String} rules 要移除的验证规则，非必选
         * @desc 移除验证规则，添加规则使用 {@link Validator#addRuleByName} 。
        */
        removeRule(fieldName, rules){
            if(!rules){
                $(this.form).find("[name=" + fieldName + "]").rules("remove")
            }else{
                $(this.form).find("[name=" + fieldName + "]").rules("remove", rules)
            }
            $(this.form).validate().resetForm()
        },
        /**
         * @function addRuleByName
         * @memberof Validator
         * @param {String} fieldName 字段名称
         * @param {Object} rule 验证规则，字符串或者对象，rule示例："isMobile"、{minlength: 2,messages:{minlength: "最小长度为2"}}。
         * @desc 一般用于动态添加规则
         */
        addRuleByName(fieldName, rule){
            $(this.form).find("[name=" + fieldName + "]").rules("add", rule)
        },
        /**
         * @function valid
         * @memberof Validator
             * @desc 校验数据验证是否通过
         * @returns {Boolean}
         */
        valid () {

            return $(this.form).valid()
        },
        /**
         * 默认的校验配置
         */
        defaults () {
            let el = this.$el

            return {
                debug : this.debug,
                ignore : '.ignore',
                errorElement : 'label',
                errorClass : 'sti-error',
                validClass : '',

                errorPlacement : function(error, element) {
                    let field = element.parents('.sti-field'),
                        formGroup = field.parents('.form-group'),
                        validEl = formGroup.find('.sti-validator-rule[valid-for=' + element.prop('name') + ']')

                    if(!$(error).html()){

                        return
                    }
                    //  添加错误提示样式
                    //error.addClass('control-label')
                    //  如果存在验证容器
                    if(validEl.length > 0) {
                        validEl.append(error)
                    } else {
                        field.append(error)
                    }
                    formGroup.addClass('sti-has-error')
                },

                success : function(error) {
                    let field = error.parents('.sti-field'),
                        formGroup = field.parents('.form-group')

                    formGroup.removeClass('has-error')
                    error.hide()
                    //    formGroup.addClass('has-success')
                }
            }
        },
        validate () {
            let rules = this.rules,
                messages = this.messages,
                validOptions = this.defaults(),
                options = Object.assign(validOptions, {rules, messages})

            $(this.form).validate(options)
        }
    }
}
