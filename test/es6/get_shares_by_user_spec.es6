let request = require('supertest');
let should = require('should');
let app = require('../app.js').app;


let simple = require('simple-mock');
let share = require('../db/share.js');

describe('GET /shares?providerUserID=some-user-id', () =>{

  let data = {
    'provider': 'twitter',
    'link' : 'http://somewhere.com',
    'providerUserID' : 'pietgeursen',
    'created_at': 'now'
    }

  let query = {providerUserID: 'piet'}

  let getShareByUserID = () => {
    return request(app)
      .get('/shares')
	  .query(query)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
  }

  it('responds with json', (done) =>{
    let getByUserIDSpy = simple.mock(share, 'getByUserID').resolveWith([data]);
    getShareByUserID()
      .expect(200, done);
  })

  it('Returns 200 with a correct query', (done) =>{
    let getByUserIDSpy = simple.mock(share, 'getByUserID').resolveWith([data]);
    getShareByUserID()
      .expect(200, () =>{
        (getByUserIDSpy.lastCall.args[0]).should.be.eql(query.providerUserID);
        done();
      });
  })

  it('Returns 400 with a bad query', (done) =>{
    let getByUserIDSpy = simple.mock(share, 'getByUserID').rejectWith('error');
    getShareByUserID()
      .expect(400, done) 
  })

  after( done =>{
    simple.restore();
    done();
  })
})

