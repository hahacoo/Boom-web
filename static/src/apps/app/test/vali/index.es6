import template from './template'
import Vue from 'vue'
import './style'

export default{
    template,
    data(){
        return {
            vtype: '1',
            start_time: '2017-03-21 18:28:38',
            end_time: '2017-03-21 18:29:03'
        }
    },
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
            }, "请填写正确的电话号码")
            /*时间段*/
            $.validator.addMethod("timeSpan", function(value, element, param){
                let valid = ($('#start_time').val() && $('#end_time').val()) || (!$('#start_time').val() && !$('#end_time').val())

                if(!valid){

                    return !!$(element).val()
                }

                return valid
            }, '请输入开始时间和结束时间')
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

            //手机号
            if(this.vtype == 1){

                this.$refs.validate.addRuleByName("code", "isMobile")
            }else if(this.vtype == 2){

                this.$refs.validate.addRuleByName("code", "isTel")
            }else if(this.vtype == 3){
                /*添加多个验证需要一个一个添加*/
                this.$refs.validate.addRuleByName("code", 'required')

                this.$refs.validate.addRuleByName("code", {"ipv4":true, messages:{ipv4: "请输入正确格式的IPv4"}})
            }
        }
    }
}