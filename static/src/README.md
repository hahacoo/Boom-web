### 文件入口

`./index.es6`，进行第三方插件和平台插件注册

### apps

app存放目录

```
|-error 错误处理app（平台维护app）
|-login 登录app（平台维护app）
|-main 平台入口（平台维护app）
|-public 门户app（平台维护app）
|-... 业务app
```

app的创建一定要通过平台的创建函数生成

```
import { createApp } from 'utils/StiBuilder'

export default createApp({

	template,

	data() {

		return {
		
		}
    },

	mounted() {
	}
})
```
### bases

基础文件(如主题配置文件)

### components

平台公共组件

### constant

常量配置文件

### i18n

国际化配置文件

### mixins

### plugins

平台插件

### router

路由管理(vue-router)

### services

平台服务

### store

状态管理(vuex)

### utils

工具类库

### 图标问题

平台所有图标采用fontawesome.css,禁止使用其他图标

### 色彩问题

平台遵循质感设计要求，色彩参照[Meterial Design palette](https://material.io/guidelines/style/color.html#)