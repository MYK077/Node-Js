const request = require("request");

var geocodeAddress = function(address){


  return new Promise(function(resolve,reject){

    var encodedAddress = encodeURIComponent(address);

    request ({url:"https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyCRvsfHxklk2DPoTcoi-K1Ze3b8vqQs-FQ",
    json:true},function(error,response,body){
     if(error){
       reject("unable to connect to google servers");
     }else if (body.status === 'ZERO_RESULTS') {
      reject("unable to find the address");
    }else if (body.status ==='OK') {
      resolve({
        address:body.results[0].formatted_address,
        lattitude:body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng

      });

    }

    });

  });
}

geocodeAddress("0000000000").then(function(location){
      console.log("the location is ", JSON.stringify(location,undefined,2))
},function(errorMessage){
      console.log(errorMessage);

})
