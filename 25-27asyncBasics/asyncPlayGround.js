console.log('starting app');

setTimeout(()=>{
  console.log("inside of callback function");
},2000);

setTimeout(()=>{
  console.log("inside second callback");
},0)

console.log('finishing up');

// output will be:
// starting app
// finishing app
// iniside callback function
