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

### components

平台公共组件

### mixins

### plugins

平台插件

### router

路由管理(vue-router)

### store

状态管理(vuex)

### utils

工具类库