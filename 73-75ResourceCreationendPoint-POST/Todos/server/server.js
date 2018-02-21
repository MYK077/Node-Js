
var express = require('express');
// body parser will take JSON and converts it into an object and attach it on the req in app.post
var bodyParser = require('body-parser');
var mongoose   = require('./db/mongoose');
var {Todo}     = require('./models/todo');
var User       = require('./models/user');

var app = express();

//app.use (to configure the middleware)
//if we are writing custom middleware it will be a function
//if we are using third party middleware we are generally accessing something of the library
// here the return value from the json method is a function that we need to give to express
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
      text: req.body.text,
    });
    todo.save().then((doc)=>{
    res.send(doc);
    },(e)=>{
      res.status(400).send(e);
    });
    console.log(req.body);
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
// doing this if you wanna add another custom property you wont be able to do
// that using res.send(todos)because you have an array
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});

app.listen(3000,()=>{
  console.log("started the port 3000")
});

module.exports = {app};
