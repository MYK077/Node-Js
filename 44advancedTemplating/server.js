// WE WILL BE USING THE HANDLEBARS VIEW ENGINE FOR THIS CODE
const express = require('express');
const hbs = require('hbs');

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
// adding middleware
// passing express.static into use and call it as a function
// __dirname stores the path to your projects directory"in this case it stores the path to 40-41node_web_server"
// now if we can render our help.html page in browser: localhost:3000/help.html
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
