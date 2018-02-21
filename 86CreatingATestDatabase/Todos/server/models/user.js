var mongoose = require('mongoose');

var User = mongoose.model('User',{
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim:true
  },
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }

})

//  // creating instances of User model
//  var newUser = new User({
//    username:"mayank yadav",
//    email:"myk.vit@gmail.com"
//  })
//
// newUser.save().then((doc)=>{
//   console.log('new user entered',doc);
// },(error)=>{
//   console.log('unable to save user info',error)
// })

module.exports = {
  User
}
