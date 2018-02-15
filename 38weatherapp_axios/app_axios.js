// axios is an npm package , a promise based HTTP client for browser and node.js
// make httprequest from the browser , and make http request from node.js
var request = require('request');
var yargs   = require('yargs');
var axios   = require('axios');

// var argv is going to be the object that stores the final parsed output thats goin to be the input
// from the process variable passed through yargs and stored here
var argv    = yargs.options({
	a:{
		// demand :true means that  a or address is required to get the weather
		demand:true,
		alias:"address",
		describe:"address to fetch weather for",
		// this makes sure that address is always passed as string
		string:true
	}
})
// .argv will take the above configuration and will store it the argv variable
// .alias('help','h') we are setting alias for help as h.
// (Accessing .argv gives us back just the arguments without any of the yargs internals like the options function or help function present.)
.help().alias("help","h").argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl     = "https://maps.googleapis.com/maps/api/geocode/json?address="+encodedAddress+"&key=AIzaSyCRvsfHxklk2DPoTcoi-K1Ze3b8vqQs-FQ";

// get method helps us make our http: get request
// there is no need to pass any other options like json:true , axios already knows it and parse our JSON data.
// And what get returns is actually a promise(that means we can use .then to run some if the promise is fullfilled or rejected),
// although you can call the succes argument anything but axios library recommends to call it a response

axios.get(geocodeUrl).then((response)=>{
	// if wrong zip is provided and if(){} statement runs then console.log(response.data) executed
	// .catch will run
	// There is a message property on all errors.
	// Whatever you pass into the Error constructor function will be the value on the message property of the resulting object.
// while using axios we need to use response.data property

	if(response.data.status === "ZERO_RESULTS"){
		throw new Error("unbale to find that address");
	}
		console.log(response.data.results[0].formatted_address);

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
	 var weatherUrl = "https://api.darksky.net/forecast/f94ce72cd2cb9c06a203f3ac1259be1d/"+lat+","+lng;

	return axios.get(weatherUrl);

}).then((response)=>{
			console.log("its currently",response.data.currently.temperature,"and it feels like",response.data.currently.apparentTemperature);

}).catch((e)=>{

	if (e.errno === "ENOTFOUND" || e.code === "ENOTFOUND"){
		console.log("sorry could not connect to API server");
	}else{
		// we can print the error message in throw new Error ("") using the e.message property
		console.log(e.message);
	}

})
