let should = require('should');
let request = require('supertest');
let app = require('../app.js').app;
let server = require('../app.js').server;



describe('POST /shares', () =>{
  it('respond with json', (done) =>{
    request(app)
      .post('/shares')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  after( done =>{
    server.close();
    done();
  })


})

