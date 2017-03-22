/**
 * 展开收起组件
 * by zhangxuemei
 * CreateTime 2017/03/17
 * E-mail zhangxuemei@b.360.cn
 * version 0.1 2017/03/14 16:23:30
 */
import template from './view'
import './style'
import $ from 'jquery'

export default {

    template,
    props: {
        leftWidth: {
            type: Number,
            default: 900
        },
        leftHeight: {
            type: Number,
            default: 900
        },
        topWidth: {
            type: Number,
            default: 900
        },
        topHeight: {
            type: Number,
            default: 200
        },
        downHeight: {
            type: Number,
            default: 200
        },
        rightWidth: {
            type: Number,
            default: 900
        },
        rightHeight: {
            type: Number,
            default: 900
        },
        direction: {
            type: String,
            default: 'left'
        },
        shownBtn: {
            type: Boolean,
            default: true
        }
    },
    data: function() {

        return {
            // class_name : null,
            direction_data: {
                leftWidth: null,
                leftHeight: null,
                leftFlag: false,

                rightWidth: null,
                rightHeight: null,
                rightFlag: false,

                topWidth: null,
                topHeight: null,
                topFlag: false,

                downWidth: null,
                downHeight: null,
                downFlag: false,

            },
            random_number: 10,
            shown_btn: true
        }
    },
    watch: {
        leftWidth: function(val, oldVal) {

            let parameter = {}

            if (!isNaN(val)) {
                parameter.content = {
                    "width": val,
                    "height": this.leftHeight
                }

            }
            parameter.btn = {
                top: '45%',
                left: this.leftWidth,
                right: 'initial'
            }

            this.generateLayout( 'leftWidth', 'leftHeight', val, this.leftHeight, this.direction, parameter)

        },
        rightWidth: function(val, oldVal) {

            let parameter = {}

            if (!isNaN(val)) {
                parameter.content = {
                    "width": val,
                    "height": this.rightHeight
                }

            }
            parameter.btn = {
                top: '45%',
                left: 'initial',
                right: this.rightWidth,
                transform: 'rotate(180deg) scale(1.5)'
            }

            this.generateLayout( 'rightWidth', 'rightHeight', val, this.rightHeight, this.direction, parameter)

        },
        topHeight: function(val, oldVal) {

            let parameter = {}

            if (!isNaN(val)) {
                parameter.content = {
                    "height": this.topHeight
                }

            }
            parameter.btn = {
                top: '95%',
                left: '50%',
                right: 'initial',
                transform: 'rotate(90deg) scale(1.5)'
            }

            this.generateLayout( 'topWidth', 'topHeight', this.topWidth, val, this.direction, parameter)
        },
        downHeight: function(val, oldVal) {

            let parameter = {}

            if (!isNaN(val)) {
                parameter.content = {
                    "height": this.downHeight
                }

            }
            parameter.btn = {
                top: 'initial',
                bottom: '96%',
                left: '50%',
                right: 'initial',
                transform: 'rotate(270deg) scale(1.5)'
            }

            this.generateLayout( 'downWidth', 'downHeight', this.topWidth, val, this.direction, parameter)
        },
        shownBtn: function(val) {
            this.shown_btn = val
            this.direction_data.leftFlag = false
            this.direction_data.rightFlag = false
            this.direction_data.topFlag = false
            this.direction_data.downFlag = false
        }
    },
    methods: {
        /**
         * 生成布局
         */
        generateLayout(
            width, height, redefineW,
            redefineH, direction, parameter
        ) {
            this.direction_data[width] = redefineW
            this.direction_data[height] = redefineH

            $('.content-' + direction).css(parameter.content)

            $('.put-btn-' + direction, this.$el).css(parameter.btn)

            this.btn.addClass('btn-animation')
        },
        contentUnfolded(
            flag, cont_parameter, size,
            btn_parameter, direction,
            opacity_flag, str
        ) {
            let container_width = 0,
                duration = 300,
                btn_top = 0,
                content_opacity = 1

            if( flag ){
                // 展开
                container_width = size
                $('.rotate-' + direction).removeClass('rotate-' + direction)
                content_opacity = 1
                btn_top = '95%'
            }else{
                $('.put-btn-' + direction, this.$el).addClass('rotate-' + direction)
                content_opacity = 0
                btn_top = 0
            }

            let cont_dic = {}

            cont_dic[cont_parameter] = container_width
            $('.content-' + direction).animate(cont_dic, duration)

            if( opacity_flag ) {
                $('.slot-' + direction).animate({
                    opacity: content_opacity
                }, duration)
            }
            let btn_dic = {}

            btn_dic[btn_parameter] = container_width

            if( str ){
                btn_dic.transform = str
            }

            $('.put-btn-' + direction, this.$el).animate(btn_dic, duration)

        },
        /**
         * 展开收起
         */
        putAway( direction ) {

            switch (direction) {
                case 'left':

                    this.contentUnfolded(
                        this.direction_data.leftFlag,
                        "width",
                        this.direction_data.leftWidth,
                        "left",
                        direction, true)

                    this.direction_data.leftFlag = !this.direction_data.leftFlag
                    break
                case 'right':

                    this.contentUnfolded(
                        this.direction_data.rightFlag,
                        "width",
                        this.direction_data.rightWidth,
                        "right",
                        direction, false, 'rotate(0deg) scale(1.5)')

                    this.direction_data.rightFlag =
                    !this.direction_data.rightFlag
                    break
                case 'top':

                    this.contentUnfolded(
                        this.direction_data.topFlag,
                        "height",
                        this.direction_data.topHeight,
                        "top",
                        direction, true, 'rotate(90deg) scale(1.5)')

                    this.direction_data.topFlag =
                    !this.direction_data.topFlag
                    break
                case 'down':

                    this.contentUnfolded(
                        this.direction_data.downFlag,
                        "height",
                        this.direction_data.downHeight,
                        "bottom",
                        direction, true, 'rotate(270deg) scale(1.5)')

                    this.direction_data.downFlag =
                    !this.direction_data.downFlag
                    break
            }
        }
    },
    mounted() {
        // this.container = $('.visualize-put-away')
        this.btn = $('.put-away-btn', this.$el)

    }
}
