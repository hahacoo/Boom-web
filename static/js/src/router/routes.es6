/**
 * app注册
 * 二级路由
 *
 * by zhangdi
 */

const routes = {

	apps: [

		{
			path: 'test',
			component: resolve => {

				require.ensure(['apps/test'], () => {

					resolve(require('apps/test'))	
				}, 'test')
			},
			children: [

				{
					path: 'sec',
					homePage: true,
					component: resolve => {

						require.ensure(['apps/test/comps/sec'], () => {

							resolve(require('apps/test/comps/sec'))	
						}, 'test')
					}
				}
			]
		}
	]
}

export default routes