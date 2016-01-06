var express = require('express');
var bodyParser = require('body-parser');
var app =  express();
var PORT = process.env.PORT || 3000; 
//process.env.PORT is a heroku specific enviromental port
var todos = [ ]
var todosNextId = 1;

//anytime json request comes in, json will parse it
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API root');
});

//GET request /todos
//when /todos gets a request, respond with a string json
app.get('/todos', function (req, res) {
	//res.send(JSON.stringify(todos)); Normal way to do it
	res.json(todos) //express, better way
});

//GET /todos/:id

app.get('/todos/:id', function (req, res) {
	//req.params are always strings, if your expecting a number
	//make sure you convert it first
	var todoID = parseInt(req.params.id, 10);
	var matchedTodo;
	//iterate over todos aray and find a match
	//call res.json on todo item if not send 404
	//res.status(404).send();
	todos.forEach(function (todo) {
		if (todoID === todo.id) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
//res.send('Asking for todo with id of ' + req.params.id);
});


//POST Request /todos
app.post('/todos', function(req, res) {
	var body = req.body;

	//push body into array
	//add id field
	//spit out new todo item
	body.id = todosNextId++;
	todos.push(body);
	res.json(body);
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});