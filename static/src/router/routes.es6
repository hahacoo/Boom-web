/**
 * app注册
 *
 * by hahacoo
 */

const routes = {

	apps: [

		{
			path: 'demo',

			component: resolve => {
				
				require.ensure(['apps/app/demo'], () => {

					resolve(require('apps/app/demo'))
				}, 'app')
			},

			children: [

				{
					path: 'test',

					defaultView: true,

					component: resolve => {

						require.ensure(['apps/app/demo/test'], () => {

							resolve(require('apps/app/demo/test'))
						}, 'app')

					},

					meta: {

						icon: 'snowflake-o',
						text: '一级菜单',
						desc: '一级菜单描述'
					},

					children: [
						{
							path: 'new',
							component: resolve => {

								require.ensure(['apps/app/demo/test/new'], () => {

									resolve(require('apps/app/demo/test/new'))
								}, 'app')

							},
							meta: {

								text: '新建'
							}
						}
					],
				},

				{
					
					path: 'expand',
					meta: {
						icon: 'snowflake-o',
						text: '二级菜单'
					}
				},

				{
					path: 'test2',
					component: resolve => {

						require.ensure(['apps/app/demo/test2'], () => {

							resolve(require('apps/app/demo/test2'))
						}, 'app')

					},
					meta: {
						parent: 'expand',
						icon: 'snowflake-o',
						text: '子菜单',
						desc: '子菜单描述'
					}
				}
			]
		}
	]
}

export default routes
