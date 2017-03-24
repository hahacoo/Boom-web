import store from 'store'

class Console {

	constructor(type = 'route') {

		this.type = type
	}

	log(content, ...styles) {

		let contents = content.split('%c').slice(1),
			label = `<span style="${styles[0]}">${contents[0]}<span>`,
			info = `<span style="${styles[1]}">${contents[1]}<span>`

		store.dispatch('updateLogs', {

			log: label + info,
			type: this.type
		})
	}

	table() {

	}

	dir(data) {

		let dataStr = JSON.stringify(data, null, 4),
			log = `<pre>${dataStr}</pre>`

		store.dispatch('updateLogs', {

			log: log,
			type: this.type
		})
	}
}

export default Console