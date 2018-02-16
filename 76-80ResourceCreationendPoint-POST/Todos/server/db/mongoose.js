var mongoose = require('mongoose');

mongoose.Promise   = global.Promise;
const MONGO_URI = 'mongodb://MYK:Myk00077$@ds239368.mlab.com:39368/user_database';
mongoose.connect(process.env.MONGO_URI||'mongodb://localhost:27017/TodoApp');



module.exports = {
   mongoose
}
