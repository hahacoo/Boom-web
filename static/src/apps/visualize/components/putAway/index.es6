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
// import { createDashBoard } from 'utils/stiBuilder'
// import * as THREE from "three"

// let template = `
// <div class="visualize-put-away" v-bind:class="{ left: direction == left }">
//     <div class="put-away-btn" @click="putAway(direction)">
//     </div>
// </div>
// `

export default {

    template,
    props: {
        width: {
            type: Number,
            default: 900
        },
        height: {
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
        direction: {
            type: String,
            default: 'left'
        },
    },
    watch: {
        width: function(val, oldVal) {

            switch (this.direction) {
                case 'left':
                    this.direction_data.leftWidth = this.width
                    this.direction_data.leftHeight = this.height

                    if (!isNaN(val)) {
                        $('.content-left').css({
                            "width": val,
                            "height": this.height
                        })

                    }
                    $('.put-btn-left', this.$el).css({
                        top: $('body').height() / 2,
                        left: this.width,
                        right: 'initial'
                    })
                    break
                case 'right':
                    this.direction_data.rightWidth = this.width
                    this.direction_data.rightHeight = this.height

                    if (!isNaN(val)) {
                        $('.content-right').css({
                            "width": val,
                            "height": this.height
                        })

                    }
                    $('.put-btn-right', this.$el).css({
                        top: $('body').height() / 2,
                        left: 'initial',
                        right: this.width,
                        transform: 'rotate(180deg) scale(1.5)'
                    })
                    break
                default:

            }

            // setTimeout(function(){
                this.btn.addClass('btn-animation')
            // }, 2000)
        },
        topHeight: function(val, oldVal) {
            switch (this.direction) {
                case 'top':
                    console.log(this.topWidth, this.topHeight, "top")
                    this.direction_data.topWidth = this.topWidth
                    this.direction_data.topHeight = this.topHeight

                    if (!isNaN(val)) {
                        $('.content-top').css({
                            "height": this.topHeight
                        })

                    }
                    $('.put-btn-top', this.$el).css({
                        top: this.topHeight + this.random_number * 7,
                        left: this.topWidth/2 - this.random_number,
                        right: 'initial',
                        transform: 'rotate(90deg) scale(1.5)'
                    })
                    break
                default:

            }

            // setTimeout(function(){
                this.btn.addClass('btn-animation')
            // }, 2000)
        },
        // topHeight: function(val, oldVal) {
        //     switch (this.direction) {
        //         case 'top':
        //             console.log(this.topWidth, this.topHeight, "top")
        //             this.direction_data.topWidth = this.topWidth
        //             this.direction_data.topHeight = this.topHeight
        //
        //             if (!isNaN(val)) {
        //                 $('.content-top').css({
        //                     "height": this.topHeight
        //                 })
        //
        //             }
        //             $('.put-btn-top', this.$el).css({
        //                 top: this.topHeight + this.random_number * 7,
        //                 left: this.topWidth/2 - this.random_number,
        //                 right: 'initial',
        //                 transform: 'rotate(90deg) scale(1.5)'
        //             })
        //             break
        //         default:
        //
        //     }
        //
        //     // setTimeout(function(){
        //         this.btn.addClass('btn-animation')
        //     // }, 2000)
        // }
    },
    data: function() {
        // let container = $('.visualize-put-away')

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

            },
            random_number: 10
        }
    },
    methods: {
        putAway( direction ) {

            let container_width = 0,
                duration = 300

            switch (direction) {
                case 'left':

                    if( this.direction_data.leftFlag ){
                        // 展开
                        container_width = this.direction_data.leftWidth
                        $('.rotate-left').removeClass('rotate-left')
                    }else{
                        $('.put-btn-left', this.$el).addClass('rotate-left')
                    }
                    $('.content-left').animate({
                        width: container_width
                    }, duration)

                    $('.put-btn-left', this.$el).animate({
                        left: container_width
                    }, duration)

                    this.direction_data.leftFlag = !this.direction_data.leftFlag
                    break
                case 'right':
                    if( this.direction_data.rightFlag ){
                        // 展开
                        container_width = this.direction_data.rightWidth
                        $('.rotate-right').removeClass('rotate-right')
                    }else{
                        $('.put-btn-right', this.$el).addClass('rotate-right')
                    }
                    $('.content-right').animate({
                        width: container_width
                    }, duration)

                    $('.put-btn-right', this.$el).animate({
                        right: container_width,
                        transform: 'rotate(0deg) scale(1.5)'
                    }, duration)

                    this.direction_data.rightFlag =
                    !this.direction_data.rightFlag
                    break
                case 'top':
                    if( this.direction_data.topFlag ){
                        // 展开
                        container_width = this.direction_data.topHeight
                        $('.rotate-top').removeClass('rotate-top')
                    }else{
                        $('.put-btn-top', this.$el).addClass('rotate-top')
                    }
                    $('.content-top').animate({
                        height: container_width
                    }, duration)

                    $('.put-btn-top', this.$el).animate({
                        top: container_width + this.random_number * 7,
                        transform: 'rotate(90deg) scale(1.5)'
                    }, duration)

                    this.direction_data.topFlag =
                    !this.direction_data.topFlag
                    break
                default:
                    container_width = 0
                    break
            }
        }
    },
    mounted() {
        // this.container = $('.visualize-put-away')
        this.btn = $('.put-away-btn', this.$el)

    }
}
