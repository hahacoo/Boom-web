/**
 * 模板文件
 * @param  {[type]} port [description]
 * @return {[type]}      [description]
 */
function template(port) {

	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>boom-web</title>
	<link rel="stylesheet" type="text/css" href="/static/css/animate/animate.min.css">
	<link rel="stylesheet" type="text/css" href="/static/css/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/static/css/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="/static/css/vue_material/dist/vue-material.css">
	<link rel="stylesheet" type="text/css" href="/static/css/commons/css/boom.css">
</head>
<body>
	<div id="boom-web" class="boom-main" :class="theme"></div>
	<div id="boom-loading"></div>
	<script type="text/javascript" src="/static/boomError.js"></script>
	<script type="text/javascript" src="http://localhost:${port}/vendor.js"></script>
	<script type="text/javascript" src="http://localhost:${port}/config.js"></script>
	<script type="text/javascript" src="http://localhost:${port}/main.js"></script>
</html>
`
}

module.exports = template;
