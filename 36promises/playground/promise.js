// using new keyword to create instance of a Promise
// we can only pass one argument to both reject and resolve
var somePromise = new Promise(function(resolve,reject){

  setTimeout(function(){
    resolve("Hey, It worked!");
  },2500)

});

// this will get called when promise is successful
// a callback function can be called twice but a promise you can only resolve once or reject once
somePromise.then(function(message){
  console.log('Success: ',message);
},function (errorMessage){
  console.log('Error: ',errorMessage)
});

var asyncAdd = function(a,b){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      if(typeof a === 'number' && typeof b ==='number'){
        resolve( a+b);
      }else{
        reject("arguments must be numbers");
      }

    },2500)

  })
}

asyncAdd(3,4).then(function(res){
    console.log("Result:", res);
},function(errorMessage){
    console.log(errorMessage);
})

// https://docs.google.com/document/d/12riEoWcFx369coNNzz2JOyOXYHshZcbDu7lk4CiS-C0/edit?ts=5a3ac7f8#
