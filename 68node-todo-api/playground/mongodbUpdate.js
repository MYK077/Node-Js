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

// findOneAndUpdate(filter,update,options)
// update operators "$set:	Sets the value of a field in a document."
db.collection('Todos').findOneAndUpdate({_id : ObjectId("5a72e991b465ff10680af69a")},
{$set: {
  completed: true
}},
{returnOriginal: false}
).then((results)=>{
  console.log(results);
});

// inserting many values at a time
db.collection('User').insertMany([
  {
    name:"mayank",
    age:"10",
    location:"salt lake city"
  },
  {
    name:"sukansha",
    age:"08",
    location:"salt lake city"

  },
  {
    name:"Jeevan",
    age:"10",
    location:"salt lake city"
  }
],(err,results)=>{
  if(err){
    console.log('unable to insert Todo',err)
  }else{
    console.log(JSON.stringify(results.ops[0]._id.getTimestamp(),undefined,2));
  }
});


db.collection('User').findOneAndUpdate({ _id : ObjectId("5a7399b08721e619544fddf6")},
{$set: {
  age: 12,
}}
).then((results)=>{
  console.log(results);
});

// $inc is an update operator, that increase the value of a field to a particular amount
db.collection('User').findOneAndUpdate({ _id : ObjectId("5a7399b08721e619544fddf6")},
{$inc: {
  age: 12,
},
$set: {
  name: "ankit"
}
}
).then((results)=>{
  console.log(results);
});


  // db.close();
})
