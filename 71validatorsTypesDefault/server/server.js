var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// adding validators here required and minlength and trim
// trim removes all the leading and trailing spaces
var Todo = mongoose.model('Todo',{
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim:true
  },
  completed:{
    type: Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  }

});

var User = mongoose.model('User',{
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim:true
  },
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },

})

// creating instances of the model Todo
 var newTodo = new Todo({
   text:'cooking the dinner'
 })

 var newTodo1 = new Todo ({
   text:"cooking full day meals",

 })

 // creating instances of User model
 var newUser = new User({
   username:"mayank yadav",
   email:"myk.vit@gmail.com"
 })

//but creating instance alone wont save the instance to the database,
// we need to call a method to it
newTodo.save().then((doc)=>{
  console.log('Saved todo', doc);
},(error)=>{
  console.log('uable to save todo')
})

newTodo1.save().then((doc)=>{
  console.log('Saved todo',doc);
},(error)=>{
  console.log('unbale to save todo')
})

newUser.save().then((doc)=>{
  console.log('new user entered',doc);
},(error)=>{
  console.log('unable to save user info',error)
})
