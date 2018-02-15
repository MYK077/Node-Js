// server.js file with get request
var express = require("express");
var app = express();

app.get("/",(req,res)=>{
  res.send("hello world!");
})

app.get("/fail",(req,res)=>{
  res.status(404).send({error:"an error message"});
})

app.get("/users",(req,res)=>{
  res.status(200).send([
    {name:"Mayank",age:"15"},
    {name:"Andrew",age:"15"},
    {name:"Vijay",age:"15"}
]);
})

if(!module.parent) {
   app.listen(3000);
}

module.exports.app = app;
