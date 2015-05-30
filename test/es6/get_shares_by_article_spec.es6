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

  
  let getShareByArticle = () => {
    return request(app)
      .get('/article')
      .set('Accept', 'application/json')
      .query(query)
      .expect('Content-Type', /json/)
  }

  it('responds with json', (done) =>{
    let getByArticleSpy = simple.mock(share, 'getByArticle').resolveWith([data]);
    
    getShareByArticle()
      .expect(200, done);
  })

  it('decodes a url encoded query string', (done) =>{
    let getByArticleSpy = simple.mock(share, 'getByArticle').resolveWith([data]);
    
    getShareByArticle()
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

