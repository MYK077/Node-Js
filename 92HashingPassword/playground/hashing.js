
// SHA256 is the property of crypto-js module
// we will not be using crypto-js library in our actual application we will be using jsonwebtoken
const {SHA256} = require('crypto-js');
const bcrypt   = require('bcryptjs');

var password = '123abc!';

//salting a password means adding bunch of random characters to that hash , which means that if we hash the same password
// multiple times we will get the different resultHash, so no one can pre compute a table to lookup the passwords
// brcypt is asynchrounous function the second argument is a call back function and first one is number of rounds you want
// to generate the salt, bcrypt is inherently slow, which is a good thing as its gonna prevent brute force attacks.
// the bigger the number the longer the algorithm is going to take
// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(password,salt,(err,hash)=>{
//     console.log(hash);
//   });
// });

// so, this is how it works, we compare the password value that user enters to the hashed password value
var hashedPassword ='$2a$10$ujuYDRl6ySzsgMlaauSDw.HIR4B8u3oW9UHeAA675Hmiqz2ktu9Ja';
// bcrypt compare , compares the password and the hashed value
bcrypt.compare(password,hashedPassword,(err,res)=>{
  console.log(res);
})
