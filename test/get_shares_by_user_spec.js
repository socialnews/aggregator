'use strict';

var request = require('supertest');
var should = require('should');
var app = require('../app.js').app;

var simple = require('simple-mock');
var share = require('../db/share.js');

describe('GET /shares?providerUserID=some-user-id', function () {

  var data = {
    'provider': 'twitter',
    'link': 'http://somewhere.com',
    'providerUserID': 'pietgeursen',
    'created_at': 'now'
  };

  var query = { providerUserID: 'piet' };

  var getShareByUserID = function getShareByUserID() {
    return request(app).get('/shares').query(query).set('Accept', 'application/json').expect('Content-Type', /json/);
  };

  afterEach(function (done) {
    simple.restore();
    done();
  });

  it('responds with json', function (done) {
    var getByUserIDSpy = simple.mock(share, 'getByUserID').resolveWith([data]);
    getShareByUserID().expect(200, done);
  });

  it('Returns 200 with a correct query', function (done) {
    var getByUserIDSpy = simple.mock(share, 'getByUserID').resolveWith([data]);
    getShareByUserID().expect(200, function () {
      getByUserIDSpy.lastCall.args[0].should.be.eql(query.providerUserID);
      done();
    });
  });

  it('Returns 400 with a bad query', function (done) {
    var getByUserIDSpy = simple.mock(share, 'getByUserID').rejectWith('error');
    getShareByUserID().expect(400, done);
  });
});
