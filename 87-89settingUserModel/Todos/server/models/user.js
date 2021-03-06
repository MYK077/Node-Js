// insatlling validator for this section from NPM
var mongoose = require('mongoose');
var validator = require('validator');

// //creating a user model we need to store the passwords in hashed form for security reasons
// //its difficult to get the unshashed value from the hashed value as its a one way algorithm
// // we can hash it but we cant unhash it.
//
// //Token is an array of objects where each object is a login token
// //we have added authentication tokens here although we can also use tokens to verify email and reset password

var User = mongoose.model('User',{
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim:true,

  },
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    // verifies that the property email has the unique value
    unique:true,
    // to validate if the email we entered is a valid email
    validate:{
      validator:function(value){
    // this will return true if email is invalid and false if email is valid
        return validator.isEmail(value);
      },
      message: '{VALUE}is not a valid email'
    },
    password:{
      type: String,
      required: true,
      minlength: 6
    },
    tokens:[{
//the access to do what they want to do like delete ,add or update a todo
      access:{
        type:String,
        required:true
      },
// this below is the string that user would send along with the http req, which would indicate that they have
      token:{
        type:String,
        required:true
      }
    }]
  }

});

module.exports = {
  User
}
