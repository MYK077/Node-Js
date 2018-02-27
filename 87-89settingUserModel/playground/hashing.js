// SHA256 is the property of crypto-js module
// we will not be using crypto-js library in our actual application we will be using jsonwebtoken
const {SHA256} = require('crypto-js');

var message = 'I am user number 3';

//the return result of SHA256 is an object , converting it into string
var hash = SHA256(message).toString();

console.log(`Message ${hash}`);

var data = {
  id:4
}
var token = {
  data:data,
  // as data is in object form and SHA256 accepts string and returns object
  // now in order to login into another users account people could log the id but donot have the text 'somesecret'
  // so their token will not match the correct value
  hash:SHA256(JSON.stringify(data)+'somesecret').toString()
}

// someone might try to change the id
token.data.id = 5;
SHA256(JSON.stringify(data)).toString();

var resultHash = SHA256(JSON.stringify(data)+'somesecret').toString()

if(resultHash === token.hash){
  console.log('Data was not changed');
}else{
  console.log('Data was changed , dont trust it');
}
