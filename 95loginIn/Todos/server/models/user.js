// insatlling validator for this section from NPM
var mongoose  = require('mongoose');
var validator = require('validator');
const jwt     = require('jsonwebtoken');
const _       = require('lodash');
const bcrypt  = require('bcryptjs');
// //creating a user model we need to store the passwords in hashed form for security reasons
// //its difficult to get the unshashed value from the hashed value as its a one way algorithm
// // we can hash it but we cant unhash it.
// //Token is an array of objects where each object is a login token
// //we have added authentication tokens here although we can also use tokens to verify email and reset password
var UserSchema = new mongoose.Schema({
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
    }},
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

});

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id','email']);
}
// UserSchema.methods is an object and on this object we can add anything we like
// in this case we are adding an instance method called generateAuthToken
// Note: here we cannot use arrow function as arrow function donot bind a this keyword
UserSchema.methods.generateAuthToken = function(){
   var user   = this;
   var access = 'auth';
   var token  = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

   user.tokens = user.tokens.concat([{access,token}]);

   return user.save().then(()=>{
     return token;
   });
}
// .statics is a object like .methods although everything you add on to it turns into a model method rather
// than an instance methods
UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  // if some error occurs in tryblock then code automatically runs the catch block with error and toHexString
  // carry on with rest of the code
  try{
      decoded = jwt.verify(token,'abc123');
  } catch(e){
    return new Promise((resolve,reject)=>{
      reject();
    });
  }

  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token

  })

}

UserSchema.statics.findByCredentials = function(email,password){
  var User = this;

  return User.findOne({email}).then((user)=>{
    if(!user){
  // this will automatically let the catch to run in server.js where this function(findByCredentials) is called
      return Promise.reject();
    }
      return new Promise((resolve,reject)=>{

      bcrypt.compare(password,user.password,(err,res)=>{
// resolve(user) would let us do stuff in server.js
        if(res){
          resolve(user);
        }else{
// this would call the catch in server.js
          reject();
        }
      });
    });
  });
}
// this middle id for hashing the password before saving it
UserSchema.pre('save',function(next){
  var user = this;

//isModified is a built in method, if the password is modified the dosomething
  if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
          user.password = hash;
          next();
        });
      });
  }else{
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
}
