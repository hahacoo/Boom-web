/**
 * extend.js
 * @param  {[type]} to   [description]
 * @param  {[type]} from [description]
 * @param  {[type]} key  [description]
 * @return {[type]}      [description]
 *
 * by hahacoo
 */
function assignKey(to, from, key) {
	var val = from[key];

	if (val === undefined || val === null) {
		return;
	}

	if(typeof val === 'object' && typeof to[key] === 'object' && Object.prototype.toString.call(val) !== '[object Array]') {

		to[key] = assign(Object(to[key]), from[key]);
	} else {
		to[key] = val;
	}

}

function assign(to, from) {

	if (to === from) {
		return to;
	}

	from = Object(from);

	for (var key in from) {

		if (Object.prototype.hasOwnProperty.call(from, key)) {
			assignKey(to, from, key);
		}
	}

	return to;
}

module.exports = function(target) {

	target = Object(target);

	for(var i=1; i<arguments.length; i++) {

		assign(target, arguments[i])
	}

	return target
}