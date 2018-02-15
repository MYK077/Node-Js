const request = require('request');

var getWeather = function(lat,lng,callback){

  request({url:"https://api.darksky.net/forecast/f94ce72cd2cb9c06a203f3ac1259be1d/"+lat+","+lng,json:true},function(error,response,body){
    if(!error && response.statusCode === 200){
      callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature
      });
    }
    else{
      callback("unable to fetch weather");
    }
  });

}

module.exports = {
  getWeather
}
