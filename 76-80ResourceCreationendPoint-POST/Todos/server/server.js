var express = require('express');
const {ObjectId} = require('mongodb');
// body parser will take JSON and converts it into an object and attach it on the req in app.post
var bodyParser = require('body-parser');
var mongoose = require('./db/mongoose');
var {Todo} = require('./models/todo');
var User = require('./models/user');

// deploying app to heroku
const port = process.env.PORT || 3000;

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
  })
})

// codenumber 78
app.get('/todos/:id',(req,res)=>{
 var id = req.params.id;
 if(!ObjectId.isValid(id)){
   // send with no argument means sending back with empty body
   return  res.status(404).send("not found");
 }
 Todo.findById(id).then((todos)=>{
   if(todos){
     res.send({todos});
   }else{
     res.status(404).send("not found");
   }
   console.log('Todos found by id',todos);
 }).catch((e)=>{
   res.status(400).send("id not found");
    });
  });

app.listen(port,()=>{
  console.log("started the port 3000");
});

module.exports = {app};
