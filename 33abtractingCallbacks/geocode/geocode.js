const request = require("request");

const yargs = require('yargs');

var geocodeAddress = function (address,callback){

  // encodeURIComponent component encode spaces for the address in the argument with %20
  var encodedAddress = encodeURIComponent(address);

  request ({url:"https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyCRvsfHxklk2DPoTcoi-K1Ze3b8vqQs-FQ",
  json:true},function(error,response,body){
    // console.log(body);
    // // to pretty printing objects using JSON.stingify: the argument after body is used to filter out properties
    // // it not used usually so its given as undefined, and third agrumnet is for spaces(indentation)
    // console.log(JSON.stringify(body,undefined,2));
   if(error){
     callback("unable to connect to google servers");
   }else if (body.status === 'ZERO_RESULTS') {
    callback("unable to find the address");
  }else if (body.status ==='OK') {
    callback(undefined,{
      address:body.results[0].formatted_address,
      lattitude:body.results[0].geometry.location.lat,
      longitude:body.results[0].geometry.location.lng

    })

  }

  });

}

module.exports = {
  geocodeAddress
}
