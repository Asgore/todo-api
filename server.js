var express = require('express');
var app =  express();
var PORT = process.env.PORT || 3000; 
//process.env.PORT is a heroku specific enviromental port

app.get('/', function (req, res) {
	res.send('Todo API root');
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});