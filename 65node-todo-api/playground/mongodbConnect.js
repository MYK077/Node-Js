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
// toArray method help us get the documents back from the database
// toArray method returns a promise
  db.collection('Todos').find().toArray().then((docs)=>{

        console.log("Todos");
        console.log(JSON.stringify(docs,undefined,2));

  },(err)=>{

        console.log('there is an error',err);

  });

  db.collection('Todos').find({completed:false}).toArray().then((docs)=>{

        console.log("Todos");
        console.log(JSON.stringify(docs,undefined,2));

  },(err)=>{

        console.log('there is an error',err);

  });

// count the docs in the entire collection
  db.collection('Todos').find().count().then((docs)=>{

        console.log("Todos");
        console.log(JSON.stringify(docs,undefined,2));

  },(err)=>{

        console.log('there is an error',err);

  });

// would return just one count
  db.collection('Todos').find({text:'walk the dog'}).count().then((docs)=>{

        console.log("Todos");
        console.log(JSON.stringify(docs,undefined,2));

  },(err)=>{

        console.log('there is an error',err);

  })

  // db.close();
})
