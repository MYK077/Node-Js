var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
})

// creating instances of the model Todo
 var newTodo = new Todo({
   text:'cooking the dinner'
 })

 var newTodo1 = new Todo ({
   text:"cooking full day meals",
   completed: false,
   completedAt: 0
 })

//but creaing intsnace alone wont save the instance to the database,
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
