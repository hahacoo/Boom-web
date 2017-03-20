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
import { createVisualize } from 'utils/stiBuilder'
import putAway from '../components/putAway'    // 展开收起容器

export default createVisualize(

    template,

    {
        components: {
            putAway
        },

        computed: {
            width: state => $('.visualize-equalProtection').width() * 0.2,
            height: state => $('.visualize-equalProtection').height()
        },

        methods: {

        },

        mounted() {

            console.log(this.width, this.height)
        }
    }

)
