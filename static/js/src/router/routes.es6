/**
 * app注册
 *
 * by zhangdi
 */

const routes = {

	apps: [

		{
			path: 'test',
			component: resolve => {
				//require.ensure(dep, cb, name)
				//dep,文件路径
				//cb,执行
				//name,包名，确保同一个app的内容打包成一个文件
				require.ensure(['apps/test'], () => {

					resolve(require('apps/test'))	
				}, 'test')
			},
			children: [

				{
					path: '',
					component: resolve => {

						require.ensure(['apps/test/sec'], () => {

							resolve(require('apps/test/sec'))	
						}, 'test')
					}
				},

				{
					path: 'sec',
					component: resolve => {

						require.ensure(['apps/test/sec'], () => {

							resolve(require('apps/test/sec'))	
						}, 'test')
					}
				}
			]
		}
	]
}

export default routes