/**
 *
 * webpack.config.js 
 *
 * by hahacoo
 */

var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	DirectoryNameAsMain = require('webpack-directory-name-as-main'),
	autoprefix = require('autoprefixer')

var extend = require('./extend')

function generator(config, options) {

	var src = config.src,
    	pro = config.pro,
    	dev = config.dev

    return extend({

			entry: {
		        main: [src.index], //入口文件
		        vendor: src.vendor //第三方库
		    },

		    output: {
		        path: dev.root, //输出路径
		        publicPath: dev.publicPath, //webpack加载资源路径前缀
		        filename: '[name].js', //bundle文件名
		        chunkFilename: '[id].js' //chunk文件名
		    },

		    watch: true,

		    devtool: '#cheap-eval-source-map', //sourcemap生成方式

		    module: {
		        noParse: /\.doc\.html$/,
		        loaders: [
		        	{
						test: /\.css$/,
						loader: "style-loader!css-loader!postcss-loader"
					},
		        	{
						test: /\.less$/,
						//modules&localIdentName=[path][name][local][hash:base64:5]路径|文件名|样式名|编码截取
						//实现css模块化
						loader: "style-loader!css-loader!postcss-loader!less-loader"
					},	{
						test: /\.es6$/,
						exclude: /(node_modules|libs)/,
						loaders: ["react-hot-loader/webpack", "babel-loader?cacheDirectory", "eslint-loader"]
					}, {
		                //文件加载器，处理文件静态资源
		                //name: 打包后文件名称
		                //publicPath: 打包后文件绝对路径
		                //文件输出地址按name属性来决定
		                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		                loader: 'file-loader?name=/static/fonts/[name].[ext]'
		            }, {
		                //图片加载器，更适合图片，
		                //特点：可以将较小的图片转成base64（data-src），减少http请求
		                //如下配置，将小于8192KB的图片转成base64码
		                test: /\.(png|jpg|jpeg|svg|gif)$/,
		                loader: 'url-loader?limit=8192&name=../../img/[name].[ext]'
		            }, {
		                test: /\.(html|tpl)$/,
		                loader: "html?attrs=img:src img:data-src" //处理html中img的资源加载
		            }

		        ]
		    },

		    plugins: [
		    	new webpack.ResolverPlugin([
		    		new DirectoryNameAsMain()
		    	]),
		    	//将jquery作为全局导出，使模块可以任意调用
		    	new webpack.ProvidePlugin({
					$: "jquery",
					jQuery: "jquery",
					"window.jQuery": "jquery"
				}),
		    	// commons chunk
		        new webpack.optimize.CommonsChunkPlugin({
		            names: ['commons', 'vendor']
		        }),
		    	//webpack1.0 required
		    	new webpack.optimize.OccurenceOrderPlugin(),
		    	new webpack.HotModuleReplacementPlugin(),
		    	new webpack.NoErrorsPlugin()
		    ], 

		    postcss: function() {

		    	return [autoprefix({ browsers: ['last 2 versions'] })]
		    },

		    resolve: {
		        //自己代码模块配置
		        root: [
		            path.resolve(src.root), //src
		        ],

		        alias: {
		        	
		        	apps: path.resolve(src.apps),
		            bases: path.resolve(src.bases),
		            state: path.resolve(src.state)
		        },

		        extensions: ['', '.js', '.es6', '.less', '.html']
		    },
		    
		    resolveLoader: {
		        //loader模块的配置，eg.style-loader
		        root: path.resolve(__dirname, src.loaderMoules || 'node_modules')
		    }
		}, options)
}

module.exports = generator
