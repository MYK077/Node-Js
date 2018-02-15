// we create test cases in this file
var utils = require("./utils.js");

var expect = require("expect");


//it() is a function provided by mocha to create test cases.
    it("should add two numbers",()=>{
      var res = utils.add(33,11);

        if(res !== 44){
          throw new Error(`expected 44 but got ${res}.`);
        }
    });

it("should square the number",()=>{
  var res = utils.square(2);

  if(res !== 4){
    throw new Error (`expected 4 but got ${res}.`);
  }

})

// Note: here we can run nodemon --exec "npm test" (single quotes for mac and linux and double quotes for win)
// now in package.json create a new script "test-watch": "nodemon --exec \"npm test\" "
// then in cmd use the folowing command: npm run test watch , and this is much more easier

// npm install expect@1.20.2 --save-dev
// -dev here means that these are dev dependencies and are not required when we launch our app on heroku
