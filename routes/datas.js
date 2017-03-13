/**
 * 通过mockjs生成测试数据
 * @type {[type]}
 */
var express = require('express');
var Mock = require('mockjs');
var router = express.Router();

//自定义请求映射关系
function localDatas(baseUrl) {

    /**
     * mock语法
     *  https://github.com/nuysoft/Mock/wiki/Syntax-Specification
     *  'name|min-max': value
     *  'name|count': value
     *  'name|min-max.dmin-dmax': value
     *  'name|min-max.dcount': value
     *  'name|count.dmin-dmax': value
     *  'name|count.dcount': value
     *  'name|+step': value
     */

    //返回一个obj
    router.route('/mock/obj')
        .all(function(req, res, next) {
            res.json(Mock.mock({
                status: 200,
                message: 'success'
            }))
        })

    router.route('/aaa')
        .all(function(req, res, next) {
            res.json(Mock.mock({
                status: 200,
                message: 'success'
            }))
        })

    //权限控制
    router.route('/permissions')
        .all(function(req, res, next) {
            res.json([{
                "path": "/boom/:any*",
                "authority": true
            }])
        })

    router.route('/login')
        .all(function(req, res, next) {

            // res.json([

            //     username: 'zhang'
            // ])

            res.json({

                username: 'xxx'
            })
        })

    return router
}

module.exports = localDatas;