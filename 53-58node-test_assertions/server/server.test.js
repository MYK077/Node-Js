// request will have the return results from supertest
var request = require("supertest");
var expect = require("expect");
var app = require("./server").app;

// we are still using mocha as the actual test framework , but we are using supertest to fill in the gaps
// type supertest in google and it should be the first link.
// req()method is provided bt supertest
it('should return hello world response',(done)=>{
  request(app)
  .get('/')
  .expect(200)
  .expect('hello world!')
  .end(done)
})

it('should return hello world response',(done)=>{
  request(app)
  .get('/fail')
  .expect(404)
  .expect({error:"an error message"})
  .end(done())
})

describe('server',()=>{
  describe('GET/',()=>{

    it('should return hello world response',(done)=>{
      request(app)
      .get('/users')
      .expect(200)
      .expect((res)=>{
    // toInclude helps us specify the subset of properties of the object
        expect(res.body).toInclude({name:"Mayank",age:"15"})
      })

      .end(done)
    })

  })
})
