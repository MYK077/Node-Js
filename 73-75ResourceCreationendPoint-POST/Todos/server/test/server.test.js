// modules installed for testing expect"for assertions" mocha"for the entire test suit" supertest"to test our test route"
// and nodemon
const expect = require('expect')
const request = require('supertest')

//"./relative path  ../ going back one directory into server to require server.js "
const {app} = require('./../server');
const {Todo} = require('./../models/todo');


// beforeEach is a testing lifecycle method
// it lets us run some code before every single test case
beforeEach((done)=>{
  // the empty object is goin to wipe all of our TODOS
  Todo.remove({}).then(()=>{
      done();
  });
});

// testing for POST todos
describe('POST/todos',()=>{
// this is goin to be an asynchronous test ,so we need to specify done otherwise this test is not going to work as expected
  it('should create a new todo',(done)=>{
      var text = 'testing the todo test';

      request(app)
       .post('/todos')
       // object {text is going to be converted to JSON by supertest}
       .send({text})
       .expect(200)
       // creating a custom expect assertion
       .expect((res)=>{
         expect(res.body.text).toBe(text);
       })
       .end((err,res)=>{
         if(err){
            return done(err);
         }
         Todo.find().then((todos)=>{
           expect(todos.length).toBe(1);
           expect(todos[0].text).toBe(text);
           done();
         }).catch((e)=>done(e));


       });
  });

    it('should not create Todo with invalid data',(done)=>{
     var text = "sending data"
      request(app)
       .post('/todos')
       // object {text is going to be converted to JSON by supertest}
       .send({})
       .expect(400)
       .end((err,res)=>{
         if(err){
            return done(err);
         }
         Todo.find().then((todos)=>{
           expect(todos.length).toBe(0);
           done();
         }).catch((e)=>done(e));

    });
 });
});
