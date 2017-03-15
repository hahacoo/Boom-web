function generateVisTemp(compTemp = '') {

	return `
	<div class="sti-visualize">

		<vis-header></vis-header>

		<div class="visualize-main">

			${compTemp}
		</div>

		<vis-background></vis-background>
	</div>
	`

}

export default generateVisTemp
