var mongoose = require('mongoose');

// process.env stores all of our environment variables as key value pairs
mongoose.Promise   = global.Promise;
const MONGO_URI = 'mongodb://MYK:Myk00077$@ds239368.mlab.com:39368/user_database';
mongoose.connect(process.env.MONGO_URI||'mongodb://localhost:27017/TodoApp');



module.exports = {
   mongoose
}
