// dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var eproxy = require('express-http-proxy');
var yaml = require('js-yaml');
var fs = require('fs');
var chalk = require('chalk');

// custom router
var home = require('./routes/index'),
    datas = require('./routes/datas');

//load config
var _config = {}

try {
    _config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8'))
} catch (e) {
    console.log('初始化配置信息错误,请检查目录下的_config.yml是否正确');
    console.log(e);

    return
}

var minimist = require('minimist'),
    args = minimist(process.argv.slice(2), {

            string: ['mode'],
          
            alias: {
                mode: 'M'
            },

            default: {
                mode: 'develop'
            }
    }),
    isProduct = args.mode === 'app'

//init app
var app = express()
// 设置模板目录
app.set('views', path.join(__dirname, _config.views || 'views/ejs'));
// 设置模板引擎，默认为ejs
app.set('view engine', _config.engine || 'ejs');

/**
 *
 * 以下注册均为应用级中间件
 */
// 图标
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

//开发模式
if(!isProduct) {

    // webpack build
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackGenerator = require('./webpack.generator')

    //init webpack
    var publicPath = 'http://localhost:' + (_config.port || 3000) + '/',
        webpackConfig = webpackGenerator(_config, {

            output: {
                path: '/',
                publicPath: publicPath
            },

            debug: false,

            devtool: 'cheap-source-map'
        })
        
    webpackConfig.entry.main.push('webpack-hot-middleware/client?reload=true')

    var compiler = webpack(webpackConfig),
        webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, {

                                            compress: true,
                                            clientLogLevel: 'info',
                                            noInfo: true,
                                            poll: 1000, // use polling instead of native watchers
                                            stats: {
                                                colors: true
                                            }
                                        })

    // 加载webpck中间件
    app.use(webpackDevMiddlewareInstance)
    // webpack热替换中间件
    app.use(webpackHotMiddleware(compiler))

    webpackDevMiddlewareInstance.waitUntilValid(function(){

        console.log(chalk.green.bold('[boom-web] webpack打包完成'));
    });
}

//注册静态资源
app.use('/static', express.static(path.join(__dirname, 'static')));
// 注册日志中间件
app.use(logger('dev'));
// 注册请求体解析中间件
app.use(bodyParser.json());
//采用qs解析字符串，比querstring要好
app.use(bodyParser.urlencoded({
    extended: true
}));
// 注册cookie中间件
app.use(cookieParser());

//中间件和路由的匹配原则不同，使用根路径会对所有请求进行隐射
app.get("/", function(req, res, next) {
    res.redirect('/boom');
})

//注册路由中间件
app.use('/boom', home(isProduct, _config.port));

//注册代理转发中间件
var proxy = Object(_config.proxy),
    baseUrl = proxy.baseUrl || '/app'

if (proxy && proxy.enable && proxy.target) {

    var rules = proxy.rules || [],
        rulePaths = rules.filter(function(rule) {

            if(typeof rule === 'object') {

                return !!rule.enable
            }

            return true
        }).map(function(rule) {

            return baseUrl + rule
        })

    app.use(rulePaths.length === 0 ? baseUrl : rulePaths, eproxy(proxy.target, {

        forwardPath: function(req, res) {

            return req._parsedUrl.path
        }
    }))
}

//数据接口路由
app.use(baseUrl, datas(proxy.baseUrl))

// 注册错误处理中间件
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;