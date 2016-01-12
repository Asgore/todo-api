var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore'); 
//this looks weird but its a popular module and most people name it with _
var app =  express();
var PORT = process.env.PORT || 3000; 
var todos = [ ]
var todosNextId = 1;

app.use(bodyParser.json());


app.get('/', function (req, res) {
	res.send('Todo API');
});

//GET request /todos
//when /todos gets a request, respond with a string json
app.get('/todos', function (req, res) {	
	res.json(todos); 
});

//GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoID = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoID});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
//res.send('Asking for todo with id of ' + req.params.id);
});


//POST Request /todos
app.post('/todos', function(req, res) {
	
//use underscore.pick to pick des and completed.
//update val of body.desc to be trimmed value
	var body = _.pick(req.body,'description', 'completed');
	


	//if on the request body the completed is NOT true or false
	//or
	//if the body description is NOT a string
	//or
	//if the length value is 0 AFTER trimming left and right aka empty string
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(404).send();
	}
	body.description = body.description.trim();

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