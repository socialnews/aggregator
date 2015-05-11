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

  it('respond with json', function (done) {
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
    //Even though this uses a 'resolve', a single argument will be handled as an error. An array ends up being a success  
    addSpy = simple.mock(share, 'add').resolveWith('error');
    request(app).post('/shares').set('Accept', 'application/json').send(data).expect('Content-Type', /json/).expect(400, done);
  });

  after(function (done) {
    simple.restore();
    server.close();
    done();
  });
});
