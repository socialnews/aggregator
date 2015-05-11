'use strict';

var request = require('supertest');
var app = require('../app.js').app;
var server = require('../app.js').server;

var simple = require('simple-mock');
var share = require('../db/share.js');

describe('POST /shares', function () {

  var data = {
    'provider': 'twitter',
    'link': 'http://somewhere.com',
    'editor': 'pietgeursen',
    'created_at': 'now'
  };

  var addSpy = undefined;

  it('responds with json', function (done) {
    addSpy = simple.mock(share, 'add').resolveWith([data]);
    request(app).post('/shares').set('Accept', 'application/json').send(data).expect('Content-Type', /json/).expect(200, done);
  });

  it('accepts a json request with params of provider, link, editor, shared_at', function (done) {
    addSpy = simple.mock(share, 'add').resolveWith([data]);
    request(app).post('/shares').set('Accept', 'application/json').send(data).expect('Content-Type', /json/).expect(200, done);
  });

  it('rejects a json request with incorrect params', function (done) {
    var data = {
      'provider': 'twitter' };
    addSpy = simple.mock(share, 'add').rejectWith('error');
    request(app).post('/shares').set('Accept', 'application/json').send(data).expect('Content-Type', /json/).expect(400, done);
  });

  after(function (done) {
    simple.restore();
    server.close();
    done();
  });
});
