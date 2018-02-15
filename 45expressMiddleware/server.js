// MIDDLEWARE : if express doesnot do something you like it to do then we add middleware teach it how to do it
// app.use is how we register middleware

// WE WILL BE USING THE HANDLEBARS VIEW ENGINE FOR THIS CODE
const express = require('express');
const hbs = require('hbs');
// fs is a node module so we donot need to install it
const fs = require('fs');

const app = express();
// to include partials for header and footer use registerPartials.
hbs.registerPartials(__dirname+'/views/partials');

// we can also create register helper function to avoid repetetion
hbs.registerHelper('getCurrentYear',function(){
  return new Date().getFullYear();
})

// using registerHelper to create a message
hbs.registerHelper('screamIt',function(text){
  return text.toUpperCase();
})
// this lets us set various express related configurations like here we are using the view engine handlebars "hbs"
app.set('view engine','hbs');
// // adding middleware
// // passing express.static into use and call it as a function
// // __dirname stores the path to your projects directory"in this case it stores the path to 40-41node_web_server"
// // now if we can render our help.html page in browser: localhost:3000/help.html
// app.use(express.static(__dirname+'/public'))



// adding another middleware
// we notify express that our middleware is done using next
// if next is not called then handlers for each request below it will never fire
app.use((req,res,next)=>{
// creating var to store date
var now = new Date().toString();
// req.method will display the method GET or POST, req.url will display the url
var log = `${now} ${req.method} ${req.url}`
// console.log(log);
// if we donot use callback with an error message then we will get a deprecaated warning message in console
fs.appendFile('server.log',log +'\n',(error)=>{
  if(error){
    console.log("there is an error while appending")
  }
})
next();
});


// but we still will get help page on browser as middleware is executed in order we call app.use
//so we can put app.use with express.static(line 29) , to not show if are in maintanence mode
app.use((req,res,next)=>{
  res.render("maintanence");
})

app.use(express.static(__dirname+'/public'))

app.get("/",function(req,res){
  res.send({
    name:"Mayank",
    lastname:"Yadav",
    likes:[
      'biking',
      'hiking',
      'music'
    ]
  });
});

app.get("/about",function(req,res){
  res.send("about page");
});

app.get("/homehbs",function(req,res){
  //this is help us render the handlebars view engine page in this case about page
  res.render("home.hbs",{
    pageTitle: 'Home Page',
    message:"welcome to my website",

  });
});

app.get("/abouthbs",function(req,res){
  //this is help us render the handlebars view engine page in this case about page
  res.render("about.hbs",{
    pageTitle: 'About Page',

  });
});

// sending back JSON with an error message
app.get("/bad",function(req,res){
  res.send({
    errorMessage:"its an error"
  })
})

app.listen(3000,function(){
  console.log("server is up to the port 3000")
});
