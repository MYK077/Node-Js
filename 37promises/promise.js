var addSync = function(a,b){
  return new Promise(function(resolve,reject){
    if(typeof a === 'number' && typeof b === 'number'){
      resolve(a+b);
    }
    else{
      reject('arguments must be numbers');
    }
  })
}


addSync(3,'4').then(function(res){
  console.log("Result:",res);
  return addSync(res,33)
},
function(errorMessage){
  console.log(errorMessage);
}).then(function(res){
  console.log('should be 40',res);
},function(errorMessage){
  console.log(errorMessage)
})

// for this the ouput will be
// output:
// arguments must be numbers
// should be 40 undefined
// therefore to avoid this we will use catch its similar to then but we use one error handelor


addSync(3,'4').then(function(res){
  console.log("Result:",res);
  return addSync(res,33)
}).then(function(res){
  console.log('should be 40',res);
}).catch(function(errorMessage){
  console.log(errorMessage);
})
