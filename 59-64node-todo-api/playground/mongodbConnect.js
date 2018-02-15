// note:mongo_id is a 12 byte value, the first four bytes are a time stamp
// mongo_id can also be provided manually while creating an object ({_id:123,})

// // Es6 destructuring "way to make new values from an object property"
// var user = {name:"myk",skill:"node ,java script"};
// var {skill}=user;
// console.log(skill);
// console.log(typeof(skill));

// pulling off MongoClient from mongodb library
const MongoClient = require('mongodb').MongoClient;
// TodoApp is the database name, by default the database is test.
// If TodoApp is not present a new database named TodoApp will be created
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    // without return the code will run even if there is error
    // using the return the program stops as soon as the error message with console.log is returned
    return console.log("unable to connect to the MongoDb Server");
  }

  console.log('connected to MongoDB Server');
  //
  // db.collection('Todos').insertOne({
  //   text:"something to do",
  //   completed:"false"
  // }, (err,results)=>{
  //   if(err){
  //     return console.log('unable to insert Todo',err)
  //   }
  //   // ops attribute is gonna store all the docs that were inserted , its basically an array of objects
  //   console.log(JSON.stringify(results.ops,undefined,2));
  // })
  //
  // db.collection('User').insertOne({
  //   name:"mayank",
  //   age:"10",
  //   location:"salt lake city"
  // },(err,results)=>{
  //   if(err){
  //     console.log('unable to insert Todo',err)
  //   }else{
  //     console.log(JSON.stringify(results.ops[0]._id.getTimestamp(),undefined,2));
  //   }
  // })

  db.close();
})
