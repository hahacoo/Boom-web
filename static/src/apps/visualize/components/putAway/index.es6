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
<div class="visualize-put-away" @click="putAway()">
</div>
`

export default {

    template,
    props: {
        width: {
            type: Number,
            default: 900,
            required: true,
            validator: function(value) {
                return value >= 0
            }
        },

        height: {
            type: Number,
            default: 900,
            required: true,
            validator: function(value) {
                return value >= 0
            }
        },

        direction: {
            type: String,
            default: 'left'
        },
    },
    data: function() {
        let container = $('.visualize-put-away')

        return {

        }
    },
    methods: {
        putAway() {
            this.container.transitionName = "sti-fading"
            let container_width = 0

            switch ( this.direction ) {
                case 'right':

                    break
                default:
                    container_width = 0
                    break
            }
            this.container.css({
                "width": container_width,
                "height": this.height
            })
        }
    },
    mounted() {
        this.container = $('.visualize-put-away')
        if( !isNaN(this.width) ) {
            this.container.css({
                "width": this.width,
                "height": this.height
            })

        }
    }
}
