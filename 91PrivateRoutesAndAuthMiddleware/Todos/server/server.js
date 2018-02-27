const config = require('./config/config');
const _ = require('lodash');
var express = require('express');
const {ObjectId} = require('mongodb');
// body parser will take JSON and converts it into an object and attach it on the req in app.post
var bodyParser = require('body-parser');
var mongoose = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

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

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    return res.status(404).send("id not found");
  }

  Todo.findByIdAndRemove(id).then((result)=>{
    if(result){
      res.send({result});
    }else{
      res.status(404).send("id not found",result);
    }
  }).catch((e)=>{
    res.status(400).send("id not found");
  });

});

// adding patch route to update todo items
app.patch('/todos/:id',(req,res)=>{
  var id   = req.params.id;
  // body is where the updates are going to be stored
  // if we want to change the todo text we will need to make a patch request
  // the issue here is that someone can send any property along that are not on the todo items for example completed at
  // completedAt is a property that should be updated by us not the user, so to pull of the properties that user updates.
  // text and completed are the properties that will be set by the users
  var body = _.pick(req.body,['text','completed'])

  if(!ObjectId.isValid(id)){
    return res.status(404).send();
  }
  //if body.completed is set by user and is completed
  if(_.isBoolean(body.completed) && body.completed){
  // get time is javascript timeStamp , values less than zero means its in the past
    body.completedAt = new Date().getTime();
  }else{
    body.completed   = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id,{$set: body},{new:true }).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });

});
// note: after submitting the patch req in Postman i.e entering some text and changing completed to true ike below
// {
// "completed": true,
// "text": "something to be completed and guess what"
//
// }
// completed will change to true and completedAt will be updated with the time stamp like shown above

// POST request for user model
app.post("/users",(req,res)=>{
   var body = _.pick(req.body,['username','email','password']);
   console.log(body);
   var user = new User(body);
   console.log(user);

  // generateauthtoken: this is an instance method that we use with instaces(user) of Models(User)
  // to generate the authtoken

   user.save().then((user)=>{
     return user.generateAuthToken();
      res.send(user);
      }).then((token)=>{
     res.header('x-auth',token).send(user);
   }).catch((e)=>{
     res.status(400).send(e);
   });
});

app.get("/users/me",authenticate,(req,res)=>{

  res.send(req.user);
});

app.listen(port,()=>{
  console.log("started the port 3000");
});

module.exports = {app};
