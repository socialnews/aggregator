let should = require('should');
let request = require('supertest');
let app = require('../app.js').app;
let server = require('../app.js').server;
let mongoose = require('mongoose');



describe('POST /shares', () =>{

  before((done) => {
    //Another possibility is to check if mongoose.connection.readyState equals 1
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/test', done);
  });

  it('respond with json', (done) =>{
    request(app)
      .post('/shares')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('accepts a json request with params of provider, link, editor, shared_at', (done) =>{
    let data = {
      'provider': 'twitter',
      'link' : 'http://somewhere.com',
      'editor' : 'pietgeursen',
      'shared_at': 'now'
      }
    request(app)
      .post('/shares')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(data, done);
  })

  it('rejects a json request with incorrect params', (done) =>{
    let data = {
      'provider': 'twitter',
      }
    request(app)
      .post('/shares')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400, done);
  })

  after( done =>{
    server.close();
    done();
  })


})

