
export default function loginFilter(to, from, done) {

	$.ajax('login')
	.then(res => {

		if(res.username) {

			done()
		} else {

			done('/login')
		}
	})
}