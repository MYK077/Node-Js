const request = require('request');

request ({url:"https://maps.googleapis.com/maps/api/geocode/json?address=1301lombard%20streetphiladelphia&key=AIzaSyCRvsfHxklk2DPoTcoi-K1Ze3b8vqQs-FQ",
json:true},function(error,response,body){
  // console.log(body);
  // to pretty printing objects using JSON.stingify: the argument after body is used to filter out properties
  // it not used usually so its given as undefined, and third agrumnet is for spaces(indentation)

  console.log(JSON.stringify(body,undefined,2));

  console.log(`Address:${body.results[0].formatted_address}`);
  console.log(`lattitude:${body.results[0].geometry.location.lat}`);

  console.log(`longitude:${body.results[0].geometry.location.lng}`);

});
