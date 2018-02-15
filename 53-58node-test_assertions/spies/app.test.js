// spys lets us swap out a real function with a testing utility or function when test function gets called we can make various
// assertions making sure that it was called with certain arguments,in spies section we will be replacing saveUser function in
// db.js with a spy to test for handleSignup, so in app.js inside handleSignup we will be calling a spy instead of db.saveUser
// spy's do come built in with expect
var expect = require('expect');
// rewire enables you to use rewire instead of require, its essential for tetsing functions with side effects
var rewire = require('rewire');
var app =rewire('./app.js');
// not only rewire allow us to require app.js but it also provide two methods to var app those are:
// app.__set__ and app.__get__ 'these can be used to mock out various data inside app.js'
describe('App',()=>{

  var db = {
    saveUser:expect.createSpy(),
  }
  // replace db using app.__set__ with db variable
  app.__set__('db',db);

  it('should call the spy correctly',()=>{
// create spy will return a function and that is the function you will swap out for the real one
// that means we do need to store that in a variable
    var spy = expect.createSpy();
    spy('Andrew',25);
    //toHaveBeenCalled is to check if spy has been called, and it has been "spy('Andrew',25)"
    expect(spy).toHaveBeenCalled();
    // to check if spy has been called with whatever arguments
    expect(spy).toHaveBeenCalledWith('Andrew',25);
  });
  it("should call saveUser with user spy",()=>{
    var email = "myk.vit@gmail.com";
    var password = "123abc";
    app.handleSignup(email,password);
    expect(db.saveUser).toHaveBeenCalledWith({email,password});
  });
});
