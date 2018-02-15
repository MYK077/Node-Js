
var getUser = function (id,callback){
  var user ={
    id: id,
    name: 'mayank'
  };
  setTimeout(function(){
      callback(user);
  },3000)

}

getUser(13, function(userInfo){
  console.log(userInfo);
})


// https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=AIzaSyCRvsfHxklk2DPoTcoi-K1Ze3b8vqQs-FQ
