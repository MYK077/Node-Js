
const jwt = require('jsonwebtoken');

var data ={
  id:5
}
// we only need to use two methods :
// jwt.sign provides the hash values
// jwt.verify provides verify if the value is correct or manipulated
var token = jwt.sign(data,'abc123')
console.log(token);

// jwt.verify
// if we change the token or secret (abc123) then verify is going to throw error
var decoded = jwt.verify(token,'abc123');
console.log('decoded',decoded);
