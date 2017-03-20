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
			meta: {

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

						appName: '测试菜单'
					}

				},

				{
					path: 'sec',
					component: resolve => {

						require.ensure(['apps/app/test/sec'], () => {

							resolve(require('apps/app/test/sec'))
						}, 'app')

					},
					meta: {

						appName: '测试菜单'
					}
				},

				{
					path: 'vali',
					component: resolve => {

						require.ensure(['apps/app/test/vali'], () => {

							resolve(require('apps/app/test/vali'))
						}, 'app')

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
			menu_text: '通用配置',
			children: [

				{
					path: '',
					redirect: 'important',
					component: resolve => {

						require.ensure(['apps/app/config/important'], () => {

							resolve(require('apps/app/config/important'))
						}, 'app')

					}
				},


				{
					path: 'important',
					component: resolve => {

						require.ensure(['apps/app/config/important'], () => {

							resolve(require('apps/app/config/important'))
						}, 'app')

					},
					menu_text: '重保单位',
					children: [
						{
							path: 'new',
							component: resolve => {

								require.ensure(['apps/app/config/important/edit'], () => {

									resolve(require('apps/app/config/important/edit'))
								}, 'app')

							},
							menu_text: '新建',
						},

						{
							path: 'edit/:id',
							component: resolve => {

								require.ensure(['apps/app/config/important/edit'], () => {

									resolve(require('apps/app/config/important/edit'))
								}, 'app')

							},
							menu_text: '编辑',
						}
					]
				},

				{
					path: 'user',
					component: resolve => {

						require.ensure(['apps/app/config/user'], () => {

							resolve(require('apps/app/config/user'))
						}, 'app')

					},
					menu_text: '用户管理',
				},

				{
					path: 'expand',
					menu_text: '二级菜单',
				},

				{
					path: 'third111',
					component: resolve => {

						require.ensure(['apps/app/config/third111'], () => {

							resolve(require('apps/app/config/third111'))
						}, 'app')

					},
					menu_parent: 'expand',
					menu_text: '三级菜单1',
				},


				{
					path: 'third222',
					component: resolve => {

						require.ensure(['apps/app/config/third222'], () => {

							resolve(require('apps/app/config/third222'))
						}, 'app')

					},
					menu_parent: 'expand',
					menu_text: '三级菜单2',
				},
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
