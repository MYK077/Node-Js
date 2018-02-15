// we create test cases in this file
var utils = require("./utils.js");

var expect = require("expect");

// test can be grouped together using describe, we can also provide those groups some name.
describe("Utils",()=>{

describe("#add",()=>{
//it() is a function provided by mocha to create test cases.
    it("should add two numbers",()=>{
      var res = utils.add(33,11);
// can read mjackson assertions
// expect(takes the object or var).tobe(takes the value).tobeA(takes the type 'number' or 'string')
    expect(res).toBe(44).toBeA('number');

      //using assertions (expect) above so we dont have to use the if () statement
      // if(res !== 44){
      //   throw new Error(`expected 44 but got ${res}.`)
      // }
    });

  });

it('should asyncAdd two numbers',()=>{
  utils.asyncAdd(3,4,(sum)=>{
    expect(sum).toBe(7).toBeA('number');
  });

})

it('should expect some values',()=>{
  expect(12).toNotBe(11);

})

  it("should square two numbers",(done)=>{
    utils.asyncSquare(4,(res)=>{
      expect(res).toBe(16).toBeA('number');
      done()
    });
  })

});
// it is a function provided by mocha

it("should verify firstName and LastName are set", ()=>{

    var res = utils.setName({
      age: "25",
      location:"salt lake city"

  },"Mayank Yadav");

  expect(res).toExclude({firstName:null ,lastName: null});
  expect(res).toInclude({firstName:"Mayank",lastName:"Yadav"});

})


// In this case the second argument to it() i.e[()=>{}] gets returned before the callback in async_callback is fired so this will return true
// in this case the assertions provided inside callback will never run, so we have to tell mocha that this is an asynchronous test and it will
// take time,so this can be achieved by providing done as argument
// it("should async add two numbers",()=>{
//     utils.async_callback(3,4,(sum)=>{
//     expect(sum).toBe(8).toBeA('number');
//   })
// })
// so in this case mocha will keep testing till done()gets called
it("should async add two numbers",(done)=>{
    utils.async_callback(3,4,(sum)=>{
    expect(sum).toBe(7).toBeA('number');
    done();
  })
})


// in order to check if  object is as expeted "toBe" will not work
it("compare two objects",()=>{
// this below will show an error as its like comparing two separate objects which are not single
   // expect({name:"mayank"}).toBe({name:"mayank"});
//this can be used for an object to be verified
 expect({name:"mayank"}).toEqual({name:"mayank"});

// this can be used to check if an object has some properties i.e wether object include certain properties
  expect({name:"mayank",age:"26",weight:"65kg"}).toInclude({name:"mayank",age:"26"});

//to check if the value provided is not present
  expect({name:"mayank",age:"27"}).toExclude({name:"cathy"});

})
