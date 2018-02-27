const {ObjectId} = require('mongodb');
const mongoose   = require('./../Todos/server/db/mongoose');
const {Todo}     = require('./../Todos/server/models/todo');
const {User}     = require('./../Todos/server/models/user');

var id = '6a8463352c99004f7866f35c';
var userId ='5a7e22e57158b22dfc996908';

if(!ObjectId.isValid(id)){
  console.log('ID not valid');
}

Todo.find({
  // here mongoose takes that string and converts it into an object id and then runs the query
  _id: id
}).then((todos)=>{
  console.log('Todos',todos);
})

// finds a single todo
Todo.findOne({
  // here mongoose takes that string and converts it into an object id and then runs the query
  _id: id
}).then((todo)=>{
  console.log('Todo',todo);
})

// finding todoById, if the id is invalid findById still runs and returns null
// we can handle this by using if statement
Todo.findById(id).then((todo)=>{
  if(!todo){
    return console.log('Id is not found');
  }
  console.log('Todo by id',todo);
}).catch((e)=>console.log(e));

User.findById(userId).then((userInfo)=>{
  if(!userInfo){
    return console.log('user info provided is in valid');
  }
  console.log('User-INfo',userInfo);
}).catch((e)=>console.log(e));
