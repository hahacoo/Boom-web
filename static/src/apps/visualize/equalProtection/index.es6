/**
 * 等级保护态势感知大屏
 * by zhangxuemei
 * CreateTime 2017/03/14
 * E-mail zhangxuemei@b.360.cn
 * version 0.1 2017/03/14 16:23:30
 */
import './style'
import template from './view'
import $ from 'jquery'
import { createVisualize } from 'utils'
import putAway from '../components/putAway'    // 展开收起容器

export default createVisualize(

    template,

    {
        components: {
            putAway
        },
        data() {
            return {
                width: null,
                height: null,
                topWidth: null,
                topHeight: null,
                downHeight: null
            }
        },

        methods: {
            /**
             * 计算宽高
             */
            computSize() {
                let container = document.getElementById("equalProtection-container"),
                    middle_content = document.getElementById("equalProtection-content")

                this.width = container.offsetWidth * 0.2
                this.height = container.offsetHeight
                this.topWidth = middle_content.offsetWidth
                this.topHeight = middle_content.offsetHeight * 0.2
                this.downHeight = middle_content.offsetHeight * 0.3

                console.log(this.topWidth, this.topHeight, document.getElementById("equalProtection-content"))

            }
        },

        mounted() {
            this.computSize()
            
            // console.log("height:", $('.equalProtection-container').height(), $('.equalProtection-container'))
        }
    }

)
