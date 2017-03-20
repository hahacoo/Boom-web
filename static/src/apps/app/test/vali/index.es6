import template from './template'
import Vue from 'vue'
import $ from 'jquery'

export default{
    template,
    mounted(){
        /**
        * 自定义验证
        */
        if(!$.validator.methods.custom){
            $.validator.addMethod( "custom", function( value, element, param ) {
                let users = [ "admin", "zhangsan" ]

                return users.indexOf(value) > -1
            }, '不符合验证规则')

            // 手机号码验证
            $.validator.addMethod("isMobile", function(value, element) {
              let vlength = value.length

              let mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/

              return this.optional(element) || mobile.test(value)

            }, "请正确填写正确的手机号码")

            // 电话号码验证
            $.validator.addMethod("isTel", function(value, element) {
              let tel = /^\d{3,4}-?\d{7,9}$/

              //电话号码格式010-12345678
              return this.optional(element) || (tel.test(value))
            }, "请正确填写正确的电话号码")
        }
    },
    methods: {
        persist(){
            let valid = (this.$refs.validate).valid()

            if(valid){
                alert('验证通过！')
            }
            
            return false
        },

        changeType(){

            this.$refs.validate.removeRule("code")

            let type = $("[name=ctype]:checked").val()

            //手机号
            if(type == 1){

                this.$refs.validate.addRuleByName("code", "isMobile")
            }else if(type == 2){

                this.$refs.validate.addRuleByName("code", "isTel")
            }
        }
    }
}