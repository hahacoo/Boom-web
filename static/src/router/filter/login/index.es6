import $ from 'jquery'

export default function loginFilter(to, from, done) {

	$.ajax('/app/login')
	.then(res => {

		if(res.username) {

			done()
		} else {

			done('/login')
		}
	})
}