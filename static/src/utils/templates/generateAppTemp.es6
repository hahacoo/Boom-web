/**
 * app模板生成函数
 * @return {[type]}          [description]
 */
function generateAppTemp() {

	return `
	<div class='sti-content'>
		<!--菜单区域-->
		<md-whiteframe class="content-aside" md-tag="aside" md-elevation="2">

			<app-menu></app-menu>
		</md-whiteframe>
		<!--主视图区域-->
		<main class="content-main">

			<transition name="sti-fadeInUp" mode="out-in" appear>

				<router-view></router-view>
			</transition>
		</main>
		<!--辅助区域-->
		<sti-assist>
			<md-button class="md-fab md-primary" md-fab-trigger>

				<sti-icon icon="close" md-icon-morph></sti-icon>
				<sti-icon icon="plus"></sti-icon>
			</md-button>
			<md-button class="md-fab md-mini md-clean md-primary" @click.native="showSide">

				<sti-icon icon="desktop"></sti-icon>
			</md-button>
			<md-button class="md-fab md-mini md-clean md-primary">

				<sti-icon icon="arrow-up"></sti-icon>
			</md-button>
		</sti-assist>
		<!--侧边快捷面板-->
		<sti-sidenav ref="rightSidenav">
			<h3 @click="go('test')">一</h3>
			<h3 @click="go('equal')">二</h3>
		</sti-sidenav>
	</div>
	`
}

export default generateAppTemp
