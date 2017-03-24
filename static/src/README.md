### 文件入口

`./index.es6`，进行第三方插件和平台插件注册

### apps

app存放目录

```
|-error 错误页面app（平台维护app）
|-login 登录app（平台维护app）
|-public 门户app（平台维护app）
|-app 业务app 所有新建的app一律放到此文件夹下面
|-visualize 大屏app 所有新建的大屏组件一律放到此文件夹下面
```

app的创建一定要通过平台的创建函数生成


	import { createApp } from 'utils/stiBuilder'
	
	export default createApp({
	
		template,
	
		data() {
	
			return {
			
			}
	    },
	
		mounted() {
		}
	})


### components

平台公共组件

### constant

常量配置文件

### gloabl

平台相关文件

### i18n

国际化配置文件

### router

路由管理(vue-router)

### store

状态管理(vuex)

### theme

主题包括两部分，一部分为通用样式，在`static/css/commons`，一部分为组件样式（vue-material、平台组件）。目前组件样式没有实现统一管理，此目录下存放为vue-material的样式配置，平台组件的配置在组件的css文件中，未来希望能找到一个合并的方式，实现统一管理。

强烈建议将颜色和其他样式分开设置，如下


	.content-aside {
	
		position: relative;
		padding-bottom: 100px;
	
		.aside-bottom {
	
			height: 100px;
			line-height: 100px;
			width: 100%;
			...
		}
	}
	
	.sti-web.default {
	
		.content-aside {
	
			background-color: #455A64;
	
			.aside-bottom {
	
				background-color: #00BFA5
			}
		}
	}
	
	.sti-web.dark {
	
		.content-aside {
	
			background-color: #424242;
	
			.aside-bottom {
	
				background-color: #000
			}
		}
	}


### store

状态管理(vuex)

### utils

工具类库

### 图标问题

平台所有图标采用fontawesome.css,禁止使用其他图标

### 色彩问题

平台遵循质感设计要求，色彩参照[Meterial Design palette](https://material.io/guidelines/style/color.html#)