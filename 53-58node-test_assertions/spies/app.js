var db = require("./db.js");

module.exports.handleSignup = (email,password)=>{
  // check is email allready exist
  db.saveUser({
    email:email,
    password:password
  })
  // save the user to the database
  // send welcome email
}
