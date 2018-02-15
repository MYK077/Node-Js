const request = require('request');

const yargs = require('yargs');

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

var address = encodeURIComponent(argv.address);

request ({url:"https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyCRvsfHxklk2DPoTcoi-K1Ze3b8vqQs-FQ",
json:true},function(error,response,body){
  // console.log(body);
  // // to pretty printing objects using JSON.stingify: the argument after body is used to filter out properties
  // // it not used usually so its given as undefined, and third agrumnet is for spaces(indentation)
  // console.log(JSON.stringify(body,undefined,2));
 if(error){
   console.log("unable to connect to google servers");
 }else if (body.status === 'ZERO_RESULTS') {
  console.log("unable to find the address");
}else if (body.status ==='OK') {
  console.log(`Address:${body.results[0].formatted_address}`);
  console.log(`lattitude:${body.results[0].geometry.location.lat}`);
  console.log(`longitude:${body.results[0].geometry.location.lng}`);

}

});
