const request = require('request');

const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');

const weather = require('./weather/weather.js');

// .argv takes all the configuration from options and runs it through the argument
const argv = yargs.options({
  a:{
    demand:true,
    alias: 'address',
    describe:'to fetch weather for',
    // this tells yargs to pass --address or --a as a string always and not number or boolean
    string:true,
  }
}).help().argv;

// console.log(argv);

geocode.geocodeAddress(argv.address, function(errorMessage, results){
  if(errorMessage){
    console.log(errorMessage);
  }else{

    // 2 is for the indentation
    console.log(JSON.stringify(results,undefined,2));
    weather.getWeather(results.lattitude,results.longitude,function(errorMessage,weatherResults){
      if(errorMessage){
        console.log(errorMessage);
      }else{
        console.log(`the current temperature is ${weatherResults.temperature},but  it feels like ${weatherResults.apparentTemperature}`);
      }
    })
  }
});

// login darsky api
// f94ce72cd2cb9c06a203f3ac1259be1d api key
// go to docs to get the link
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
