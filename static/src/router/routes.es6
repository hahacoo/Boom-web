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
			redirect: 'sec',
			meta: {
				text: '测试app',
				appName: '测试app'
			},
			children: [

				{
					path: '',
					component: resolve => {

						require.ensure(['apps/app/test/sec'], () => {

							resolve(require('apps/app/test/sec'))
						}, 'app')

					},
					meta: {
						text: '测试菜单',
						appName: '测试菜单'
					}
				},

				{
					path: 'sec',
					defaultView: true,
					component: resolve => {

						require.ensure(['apps/app/test/sec'], () => {

							resolve(require('apps/app/test/sec'))
						}, 'app')

					},
					meta: {
						icon: 'snowflake-o',
						text: '测试菜单sec',
						appName: '测试菜单'
					}
				},

				{
					path: 'vali',
					component: resolve => {

						require.ensure(['apps/app/test/vali'], () => {

							resolve(require('apps/app/test/vali'))
						}, 'app')

					},
					meta: {
						icon: 'snowflake-o',
						text: '测试菜单vali',
						appName: '测试菜单'
					}
				},
			]
		},

		{
			path: 'config',
			component: resolve => {
				//require.ensure(dep, cb, name)
				//dep,文件路径
				//cb,执行
				//name,包名，确保同一个app的内容打包成一个文件
				require.ensure(['apps/app/config'], () => {

					resolve(require('apps/app/config'))
				}, 'app')
			},
			meta: {
				text: '通用配置'
			},
			children: [

				{
					path: '',
					redirect: 'important',
					component: resolve => {

						require.ensure(['apps/app/config/important'], () => {

							resolve(require('apps/app/config/important'))
						}, 'app')

					},
					meta: {
						icon: 'snowflake-o'
					},

				},

				{
					path: 'important',
					defaultView: true,
					component: resolve => {

						require.ensure(['apps/app/config/important'], () => {

							resolve(require('apps/app/config/important'))
						}, 'app')

					},
					meta: {
						icon: 'snowflake-o',
						text: '重保单位'
					},
					children: [
						{
							path: 'new',
							component: resolve => {

								require.ensure(['apps/app/config/important/edit'], () => {

									resolve(require('apps/app/config/important/edit'))
								}, 'app')

							},
						},

						{
							path: 'edit/:id',
							component: resolve => {

								require.ensure(['apps/app/config/important/edit'], () => {

									resolve(require('apps/app/config/important/edit'))
								}, 'app')

							},
						}
					],
				},

				{
					path: 'user',
					component: resolve => {

						require.ensure(['apps/app/config/user'], () => {

							resolve(require('apps/app/config/user'))
						}, 'app')

					},
					meta: {
						icon: 'snowflake-o',
						text: '用户管理'
					}
				},

				{
					meta: {
						icon: 'snowflake-o',
						text: '二级菜单'
					},
					path: 'expand'
				},

				{
					path: 'third111',
					component: resolve => {

						require.ensure(['apps/app/config/third111'], () => {

							resolve(require('apps/app/config/third111'))
						}, 'app')

					},
					meta: {
						parent: 'expand',
						icon: 'snowflake-o',
						text: '三级菜单1'
					}
				},

				{
					path: 'third222',
					component: resolve => {

						require.ensure(['apps/app/config/third222'], () => {

							resolve(require('apps/app/config/third222'))
						}, 'app')

					},
					meta: {
						parent: 'expand',
						icon: 'snowflake-o',
						text: '某级菜单'
					}
				},

				{
					path: 'thir_naked',
					menu_parent: 'expand',
					menu_text: '没有子的二级菜单',
					menu_icon: 'snowflake-o'
				},

				{
					path: 'vali',
					component: resolve => {

						require.ensure(['apps/app/test/vali'], () => {

							resolve(require('apps/app/test/vali'))
						}, 'app')

					},
					meta: {
						icon: 'snowflake-o',
						text: 'vali'
					}
				},

				{
					meta: {
						icon: 'snowflake-o',
						text: '我也是二级菜单'
					},
					path: 'expand2'
				},

				{
					path: 'valii',
					component: resolve => {

						require.ensure(['apps/app/test/vali'], () => {

							resolve(require('apps/app/test/vali'))
						}, 'app')

					},
					meta: {
						parent: 'expand2',
						icon: 'snowflake-o',
						text: 'valiii'
					}
				}
			]
		}
	],

	visualize: [
		{
			name: 'page1',
			path: 'test',
			component: resolve => {
				//require.ensure(dep, cb, name)
				//dep,文件路径
				//cb,执行
				//name,包名，确保同一个app的内容打包成一个文件
				require.ensure(['apps/visualize/test'], () => {

					resolve(require('apps/visualize/test'))
				}, 'visualize')
			}
		},
		{
			name: 'page',
			path: 'equalProtection',
			component: resolve => {
				//require.ensure(dep, cb, name)
				//dep,文件路径
				//cb,执行
				//name,包名，确保同一个app的内容打包成一个文件
				require.ensure(['apps/visualize/equalProtection'], () => {

					resolve(require('apps/visualize/equalProtection'))

				}, 'visualize')
			}
		}
	]
}

export default routes
