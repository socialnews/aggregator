'use strict';

var request = require('supertest');
var app = require('../app.js').app;

var simple = require('simple-mock');
var share = require('../db/share.js');

describe('POST /shares', function () {

  var data = {
    'provider': 'twitter',
    'link': 'http://somewhere.com',
    'editor': 'pietgeursen',
    'created_at': 'now'
  };

  var postToShares = function postToShares() {
    return request(app).post('/shares').set('Accept', 'application/json').send(data).expect('Content-Type', /json/);
  };

  afterEach(function (done) {
    simple.restore();
    done();
  });

  it('responds with json', function (done) {
    var addSpy = simple.mock(share, 'add').resolveWith([data]);
    postToShares().expect(200, done);
  });

  it('accepts a json request with params of provider, link, editor, shared_at', function (done) {
    var addSpy = simple.mock(share, 'add').resolveWith([data]);
    postToShares().expect(200, done);
  });

  it('rejects a json request with incorrect params', function (done) {
    var data = {
      'provider': 'twitter' };
    var addSpy = simple.mock(share, 'add').rejectWith('error');
    postToShares().expect(400, done);
  });
});
