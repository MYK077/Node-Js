const {ObjectId} = require('mongodb');
const mongoose   = require('./../Todos/server/db/mongoose');
const {Todo}     = require('./../Todos/server/models/todo');
const {User}     = require('./../Todos/server/models/user');

// will remove all the records
Todo.remove({}).then((result)=>{
  console.log(result);
})

// will remove one record findOneAndRemove({_id:'nw8dy9w8dbeud877'})
Todo.findOneAndRemove({}).then((result)=>{
  console.log(result);
})

Todo.findByIdAndRemove({}).then((result)=>{
  console.log(result);
})
