import $ from 'jquery'

export default function loginFilter(to, from, done) {

	return new Promise((resolve, reject) => {

			$.ajax('/app/login')
			.then(res => {

				if(res.username) {

					resolve()
				} else {

					resolve('/login')
				}
			})
		})
}