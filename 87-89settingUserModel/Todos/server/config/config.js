// NODE_ENV environment variable was made famous by express but now has been adopted by all the node hosting companies
var env = process.env.NODE_ENV || 'development';
console.log('env ****',env);

if (env === 'development') {
  process.env.PORT      = 3000;
  process.env.MONGO_URI = 'mongodb://localhost:27017/TodoApp';
}else if (env = 'test') {
  process.env.PORT = 3000;
  process.env.MONGO_URI = 'mongodb://localhost:27017/TodoAppTest';
}
