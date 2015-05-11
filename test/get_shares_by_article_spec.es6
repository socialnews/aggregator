let request = require('supertest');
let should = require('should');
let app = require('../app.js').app;
let server = require('../app.js').server;


let simple = require('simple-mock');
let share = require('../db/share.js');

describe('GET /article?url=some-urlencoded-url', () =>{

  let data = {
    'provider': 'twitter',
    'link' : 'http://somewhere.com',
    'editor' : 'pietgeursen',
    'created_at': 'now'
    }

  let query = {url: 'http%3A%2F%2Fmongoosejs.com%2Fdocs%2Fmodels.html' };

  let getByArticleSpy;

  it('responds with json', (done) =>{
    getByArticleSpy = simple.mock(share, 'getByArticle').resolveWith([data]);
    request(app)
      .get('/article')
      .set('Accept', 'application/json')
      .query(query)
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('expects a query string where {url: encoded_url} ', (done) =>{
    getByArticleSpy = simple.mock(share, 'getByArticle').resolveWith([data]);
    request(app)
      .get('/article')
      .set('Accept', 'application/json')
      .query(query)
      .expect('Content-Type', /json/)
      .expect(200, () =>{
        (getByArticleSpy.lastCall.args[0]).should.be.eql(decodeURIComponent(query.url));
        done();
      });
  })

  after( done =>{
    simple.restore();
    server.close();
    done();
  })


})

