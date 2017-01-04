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
	<title>boom-react</title>
	<link rel="icon" type="image/x-icon" href="/static/favicon.ico">
	<link rel="stylesheet" type="text/css" href="/static/css/bootstrap/dist/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/static/css/commons/css/boom.css">
</head>
<body>
	<div id="react-app" class="boom-app">
		
	</div>
	<script type="text/javascript" src="http://localhost:${port}/vendor.js"></script>
	<script type="text/javascript" src="http://localhost:${port}/commons.js"></script>
	<script type="text/javascript" src="http://localhost:${port}/main.js"></script>
</html>
`
}

module.exports = template;
