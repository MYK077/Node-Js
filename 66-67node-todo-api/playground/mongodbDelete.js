// note:mongo_id is a 12 byte value, the first four bytes are a time stamp
// mongo_id can also be provided manually while creating an object ({_id:123,})

// pulling off MongoClient,ObjectId from mongodb library
const {MongoClient,ObjectId} = require('mongodb');
// TodoApp is the database name, by default the database is test.
// If TodoApp is not present a new database named TodoApp will be created
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    // without return the code will run even if there is error
    // using the return the program stops as soon as the error message with console.log is returned
    return console.log("unable to connect to the MongoDb Server");
  }

  console.log('connected to MongoDB Server');

  // deleteMany:delete all the items that match the criteria
  db.collection('Todos').deleteMany({text: "walk the dog"}).then((results)=>{
     console.log(results);
  })

  // deletOne: delete first of all the items that match the criteria
  db.collection('Todos').deleteOne({text: "walk the dog"}).then((results)=>{
     console.log(results);
  })

  // findOneAndDelete : find the matching item and deletes it " it also display the deleted item in the console"
  db.collection('Todos').findOneAndDelete({text: "something to do"}).then((results)=>{
     console.log(results);
  })
// using find one and deleting by ObjectId
  db.collection('Todos').findOneAndDelete({_id : ObjectId("5a72e926c4ed2811500fd88d")}).then((results)=>{
     console.log(results);
  })

  // db.close();
})
