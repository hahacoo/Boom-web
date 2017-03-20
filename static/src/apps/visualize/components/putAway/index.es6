/**
 * 展开收起组件
 * by zhangxuemei
 * CreateTime 2017/03/17
 * E-mail zhangxuemei@b.360.cn
 * version 0.1 2017/03/14 16:23:30
 */
import './style'
import $ from 'jquery'
// import { createDashBoard } from 'utils/stiBuilder'
// import * as THREE from "three"

let template = `
<div class="visualize-put-away">
    <div class="put-away-btn" @click="putAway(direction)"></div>
</div>
`

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

        direction: {
            type: String,
            default: 'left'
        },
    },
    watch: {
        width: function(val, oldVal) {

            // let self1 = this

            // console.log(this.direction)
            if (!isNaN(val)) {
                this.container.css({
                    "width": val,
                    "height": this.height
                })

            }

            // this.btn = $('.put-away-btn', this.el)

            switch (this.direction) {
                case 'left':
                    this.direction_data.leftWidth = this.width
                    this.direction_data.leftHeight = this.height
                    this.btn.css({
                        top: $('body', this.el).height() / 2,
                        left: this.width
                    })
                    break
                default:

            }

            // setTimeout(function(){
                this.btn.addClass('btn-animation')
            // }, 2000)
        }
    },
    data: function() {
        // let container = $('.visualize-put-away')

        return {
            direction_data: {
                leftWidth: null,
                leftHeight: null,
                leftFlag: false
            }
        }
    },
    methods: {
        putAway( direction ) {

            let container_width = 0

            switch (direction) {
                case 'left':
                    // this.direction_data.leftWidth
                    if( this.direction_data.leftFlag ){
                        // 展开
                        container_width = this.direction_data.leftWidth
                    }
                    this.container.animate({
                        width: container_width
                    }, 300)

                    this.btn.animate({
                        left: container_width
                    }, 300)
                    this.direction_data.leftFlag = !this.direction_data.leftFlag
                    break
                default:
                    container_width = 0
                    break
            }
        }
    },
    mounted() {
        this.container = $('.visualize-put-away', this.el)
        this.btn = $('.put-away-btn', this.el)

    }
}
