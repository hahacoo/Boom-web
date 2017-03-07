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
	<title>sti-app</title>
	<link rel="stylesheet" type="text/css" href="/static/css/animate/animate.min.css">
	<link rel="stylesheet" type="text/css" href="/static/css/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/static/css/vue_material/dist/roboto.css">
	<link rel="stylesheet" type="text/css" href="/static/css/vue_material/dist/google-icon.css">
	<link rel="stylesheet" type="text/css" href="/static/css/vue_material/dist/vue-material.css">
	<link rel="stylesheet" type="text/css" href="/static/css/commons/css/sti.css">
</head>
<body>
	<div id="sti-app" class="sti-main" :class="theme"></div>
	<script type="text/javascript" src="http://localhost:${port}/vendor.js"></script>
	<script type="text/javascript" src="http://localhost:${port}/commons.js"></script>
	<script type="text/javascript" src="http://localhost:${port}/main.js"></script>
</html>
`
}

module.exports = template;
