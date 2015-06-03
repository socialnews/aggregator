let request = require('supertest');
let should = require('should');
let app = require('../app.js').app;
let server = require('../app.js').server;


let simple = require('simple-mock');
let share = require('../db/share.js');

describe('GET /shares/editor_id', () =>{

  let data = {
    'provider': 'twitter',
    'link' : 'http://somewhere.com',
    'editor' : 'pietgeursen',
    'created_at': 'now'
    }

  let query = {editor: 'piet'}

  let getShareByEditor = () => {
    return request(app)
      .get('/shares')
	  .query(query)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
  }

  it('responds with json', (done) =>{
    let getByEditorSpy = simple.mock(share, 'getByEditor').resolveWith([data]);
    getShareByEditor()
      .expect(200, done);
  })

  it('Returns 200 with a correct query', (done) =>{
    let getByEditorSpy = simple.mock(share, 'getByEditor').resolveWith([data]);
    getShareByEditor()
      .expect(200, () =>{
        (getByEditorSpy.lastCall.args[0]).should.be.eql(query.editor);
        done();
      });
  })

  after( done =>{
    simple.restore();
    server.close();
    done();
  })
})
