var mongoose = require('mongoose');
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

// creating instances of the model Todo
 var newTodo = new Todo({
   text:'cooking the dinner'
 })

 var newTodo1 = new Todo ({
   text:"cooking full day meals",
 })

 // //but creating instance alone wont save the instance to the database,
 // // we need to call a method to it
 // newTodo.save().then((doc)=>{
 //   console.log('Saved todo', doc);
 // },(error)=>{
 //   console.log('uable to save todo')
 // })
 //
 // newTodo1.save().then((doc)=>{
 //   console.log('Saved todo',doc);
 // },(error)=>{
 //   console.log('unbale to save todo')
 // })

module.exports= {
  Todo
};
