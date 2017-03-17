/**
 * app模板生成函数
 * @return {[type]}          [description]
 */
function generateAppTemp() {

	return `
	<div class='sti-content'>
		<!--菜单区域-->
		<app-menu></app-menu>
		<!--主视图区域-->
		<main class="content-main">
			<transition name="sti-fadeInUp" mode="out-in" appear>
				<router-view></router-view>
			</transition>
		</main>
		<!--辅助区域-->
		<sti-assist />
		<!--侧边快捷面板-->
		<sti-sidenav ref="rightSidenav" />
	</div>
	`
}

export default generateAppTemp
