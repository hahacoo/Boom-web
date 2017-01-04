# Boom-React前端开发环境

该项目提供了express搭建的一个本地node服务器，方便本地调试，同时使用gulp+webpack构建前端，提高编译效率，前端框架采用React。

## 安装依赖

1. 开发环境依赖

	clone到本地之后，在项目根目录下执行如下命令：
	
	```
	npm install
	```
2. gulp全局安装
	
	gulp工具采用4.0版本，如果之前安装过gulp，请移除之前版本再执行如下命令：

	```
	npm install gulpjs/gulp#4.0 -g
	```

## 使用

1. 项目结构

```
|-bin 服务端命令集
|-routes 路由集合
|	|-datats 本地数据路由
|	|-index 主页路由
|-static 静态文件
|	|-css css文件（基础样式库）
|	|-fonts 字体文件
|	|-img 图片
|	|-js 前端代码
|		|-dev 开发环境编译后文件夹
|		|-pro 发布环境编译后文件夹
|		|-src 前端es6文件
|-test 测试用例
|   |-mocha.opts mocha配置文件
|   |-commonjs 符合commonjs语法规范的测试用例
|   |-es6 符合ES6语法规范的测试用例
|-views 服务端模板文件
|-app.js 服务端入口文件
|-config.yml 项目配置文件
|-.babelrc babel配置文件
|-.eslintrc eslint配置文件
|-gulpfile gulp配置文件
|-karma.conf.js karma配置文件
|-nodemon.json nodemon配置文件
```
2. 命令

```
npm start
```
进入开发模式，启动本地服务，开启热替换功能

```
npm run start:app
```
启动express本地服务

```
npm test
```
执行测试

```
npm run karma
```
启动karma

```
npm run build
```
将前端代码编译到`dev`目录下，省去不必要的操作

```
npm run build:pro
```
将前端代码编译到`pro`目录下，进行压缩、混淆、hash处理



