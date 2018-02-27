var {User} = require('./../models/user.js');

var  authenticate = (req,res,next)=>{

var token = req.header('x-auth');

  User.findByToken(token).then((user)=>{

    if(!user){
      res.status(401).send();
      console.log("err");
    }
    req.user  = user;
    req.token = token;
    next();
  }).catch((e)=>{
    res.status(401).send();
  });

}

module.exports = {authenticate};
