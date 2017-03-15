/**
 * app模板生成函数
 * @return {[type]}          [description]
 */
function generateAppTemp() {

	return `
	<div class='sti-content'>
	
		<md-whiteframe class="content-aside" md-tag="aside" md-elevation="2">

			<app-menu></app-menu>
		</md-whiteframe>

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
			<md-button class="md-fab md-mini md-clean md-primary">

				<sti-icon icon="envelope"></sti-icon>
			</md-button>
			<md-button class="md-fab md-mini md-clean md-primary">

				<sti-icon icon="arrow-up"></sti-icon>
			</md-button>
		</sti-assist>
	</div>
	`
}

export default generateAppTemp
