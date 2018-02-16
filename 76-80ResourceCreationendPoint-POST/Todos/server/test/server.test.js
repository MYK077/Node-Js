const expect = require('expect');
const request = require('supertest');
// requireing object Id for code num 78
const {ObjectId} = require('mongodb');

//"./relative path  ../ going back one directory into server to require server.js "
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// since beforeEach will delete all the todos from the list  before each state
// we need to create a const todos with an array of objects
const todos = [{
  // adding object id to test get('/todos/:id')
  _id:  ObjectId(),
  text:'first test todo'
},{
  _id:  ObjectId(),
  text: 'second test todo'
}]
// we have modified beforeEach() with insertMany method
beforeEach((done)=>{
  Todo.remove({}).then(()=>{
// return will let us help chain callbacks
    return Todo.insertMany(todos);
  }).then(()=>done());
});

describe('POST/todos',()=>{
// this is goin to be an asynchronous test ,so we need to specify done otherwise this test is not going to work as expected
  it('should create a new todo',(done)=>{
      var text = 'testing the todo test';

      request(app)
       .post('/todos')
       .send({text})
       .expect(200)
       .expect((res)=>{
         expect(res.body.text).toBe(text);
       })
       .end((err,res)=>{
         if(err){
            return done(err);
         }
         Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  })
})

it('should not create a new todo with the invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
// since we are adding two todos at top of our code and third one is not added as its a negative test case
// todos.length should be 2 in this case and test case will pass
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });


describe('GET/todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2)
    })
    .end(done)
  });
});

describe('GET /todos/:id',()=>{
  it('should return todo doc',(done)=>{
    request(app)
    // here we are converting _id as a string because that is what we are goin to pass as url
    // so to convert an objectID to a string we use to toHexString() method
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      // todo have has text property i.e _id
      expect(res.body.todos.text).toBe(todos[0].text);
    })
    .end(done)
  });

  it('should return 404 if todo is not found',(done)=>{
// make sure you get a 404 back
    var id = new ObjectId().toHexString();
    request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .end(done);
  })


  it('should return 404 for non-objects ids',(done)=>{
// make sure you get a 404 back
    var id = 7889;
    request(app)
    .get('/todos/123hex')
    .expect(404)
    .end(done);
  });

});
