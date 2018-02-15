const request = require('request');

const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');

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
    console.log(JSON.stringify(results,undefined,2))
  }
});

// login darsky api
// f94ce72cd2cb9c06a203f3ac1259be1d api key
// go to docs to get the link
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]

request({url:"https://api.darksky.net/forecast/f94ce72cd2cb9c06a203f3ac1259be1d/42.31,-71.0589",json:true},function(error,response,body){
  if(!error && response.statusCode === 200){
    console.log(`temperature is: ${body.currently.temperature}`);
  }
  else{
    console.log("unable to fetch weather")
  }
})
