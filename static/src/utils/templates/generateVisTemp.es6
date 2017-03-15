function generateVisTemp(compTemp = '') {

	return `
	<transition name="sti-fade" mode="out-in" appear>
		<div class="sti-visualize">

			<vis-header></vis-header>

			<div class="visualize-main">

				${compTemp}
			</div>

			<vis-background></vis-background>
		</div>
	</transition>
	`

}

export default generateVisTemp
