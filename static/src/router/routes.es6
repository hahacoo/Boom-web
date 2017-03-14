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
				require.ensure(['apps/app/test'], () => {

					resolve(require('apps/app/test'))
				}, 'app')
			},
			children: [

				{
					path: '',
					component: resolve => {

						require.ensure(['apps/app/test/sec'], () => {

							resolve(require('apps/app/test/sec'))
						}, 'app')

					}
				},

				{
					path: 'sec',
					component: resolve => {

						require.ensure(['apps/app/test/sec'], () => {

							resolve(require('apps/app/test/sec'))
						}, 'app')

					}
				}
			]
		}
	],

	visualize: [
		{

			path: 'test',
			component: resolve => {
				//require.ensure(dep, cb, name)
				//dep,文件路径
				//cb,执行
				//name,包名，确保同一个app的内容打包成一个文件
				require.ensure(['apps/visualize/test'], () => {

					resolve(require('apps/visualize/test'))
				}, 'visualize')
			},
			children: [

				{
					path: '',
					component: resolve => {

						require.ensure(['apps/visualize/test/comp'], () => {

							resolve(require('apps/visualize/test/comp'))
						}, 'visualize')
					}
				},
			]
		},
		{

			path: 'equalProtection',
			component: resolve => {
				//require.ensure(dep, cb, name)
				//dep,文件路径
				//cb,执行
				//name,包名，确保同一个app的内容打包成一个文件
				require.ensure(['apps/visualize/equalProtection'], () => {

					resolve(require('apps/visualize/equalProtection'))

				}, 'visualize')
			},
		}
	]
}

export default routes
