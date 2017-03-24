/**
 * 等级保护态势感知大屏
 * by zhangxuemei
 * CreateTime 2017/03/14
 * E-mail zhangxuemei@b.360.cn
 * version 0.1 2017/03/14 16:23:30
 */
import './style'
import template from './view'
import StiVisualize from 'lib/StiVisualize'
import putAway from '../components/putAway'    // 展开收起容器

export default new StiVisualize(template, {

        components: {
            putAway
        },
        
        data() {
            return {
                leftWidth: null,
                leftHeight: null,
                topWidth: null,
                topHeight: null,
                downHeight: null,
                rightWidth: null,
                rightHeight: null,
                full_screen: false,
                shown_btn: true,
                information: "全屏"
            }
        },

        methods: {
            /**
             * 计算宽高
             */
            computSize() {
                let container = document.getElementById("equalProtection-container"),
                    middle_content = document.getElementById("equalProtection-content")

                this.leftWidth = container.offsetWidth * 0.2
                this.leftHeight = container.offsetHeight
                this.rightWidth = container.offsetWidth * 0.3
                this.rightHeight = container.offsetHeight
                this.topWidth = middle_content.offsetWidth
                this.topHeight = middle_content.offsetHeight * 0.2
                this.downHeight = middle_content.offsetHeight * 0.3

            },
            fullScreen() {

                if( !this.full_screen ){
                    // 全屏
                    this.leftWidth = 0
                    this.topHeight = 0
                    this.downHeight = 0
                    this.rightWidth = 0

                    this.shown_btn = false

                    // $('.equalProtection-search', this.$el).css({
                    //     'display': 'none'
                    // })
                    //
                    // $('.visualize-header').css({
                    //     'display': 'none'
                    // })

                    $('i').removeClass('fa-expand')
                    $('i').addClass('fa-compress')
                    this.information = "取消全屏"
                }else{
                    this.computSize()
                    this.shown_btn = true
                    // $('.equalProtection-search', this.$el).css({
                    //     'display': 'block'
                    // })
                    // $('.visualize-header').css({
                    //     'display': 'block'
                    // })
                    $('i').removeClass('fa-compress')
                    $('i').addClass('fa-expand')
                    this.information = "全屏"
                }

                this.full_screen = !this.full_screen
            }
        },

        mounted() {
            this.computSize()
        }
})

