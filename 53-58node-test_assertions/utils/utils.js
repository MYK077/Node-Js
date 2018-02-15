module.exports.add =(a,b) =>{
  return a+b;
}

module.exports.asyncAdd =(a,b,callback)=>{
  setTimeout(()=>{
    callback(a+b);
  },1000)
}

module.exports.asyncSquare = (x,callback) =>{

  setTimeout(()=>{
    callback(x*x);
  },1000)


}

module.exports.setName = (user,fullName) =>{
// split( ' ') function used here will split the fullname from the space into an array
  var names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];

  return user;
}

module.exports.async_callback = (a,b,callback)=>{

  setTimeout(()=>{
    callback(a+b);
  },1000)

};
