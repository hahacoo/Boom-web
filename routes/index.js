/**
 * 主页入口
 * @type {[type]}
 */
var template = require('./app_template')
var express = require('express')
var router = express.Router()

module.exports = function(isProduct, port=3000) {

	if(!isProduct) {

		return router.use(function(req, res, next) {
			
			res.send(template(port))
		})

	} 

	return router.use(function(req, res, next) {
			
			res.render('index', { title: 'Express' });
		})
}
