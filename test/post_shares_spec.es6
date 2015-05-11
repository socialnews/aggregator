let should = require('should');
let request = require('supertest');
let app = require('../app.js').app;
let server = require('../app.js').server;


let simple = require('simple-mock');
let share = require('../db/share.js');

let Promise = require('bluebird');
simple.Promise = Promise


describe('POST /shares', () =>{

  let data = {
    'provider': 'twitter',
    'link' : 'http://somewhere.com',
    'editor' : 'pietgeursen',
    'created_at': 'now'
    }

  let addSpy;

  before((done) => {
    done();
  });

  it('respond with json', (done) =>{
    addSpy = simple.mock(share, 'add').resolveWith([data]);
    request(app)
      .post('/shares')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('accepts a json request with params of provider, link, editor, shared_at', (done) =>{
    addSpy = simple.mock(share, 'add').resolveWith([data]);
    request(app)
      .post('/shares')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200,done);
  })

  it('rejects a json request with incorrect params', (done) =>{
    let data = {
      'provider': 'twitter',
      }
    addSpy = simple.mock(share, 'add').rejectWith(new Promise.OperationalError());
    request(app)
      .post('/shares')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(400, done);
  })

  after( done =>{
    simple.restore();
    server.close();
    done();
  })


})

