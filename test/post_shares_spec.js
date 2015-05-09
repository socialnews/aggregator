'use strict';

var should = require('should');
var request = require('supertest');
var app = require('../app.js').app;
var server = require('../app.js').server;

describe('POST /shares', function () {
  it('respond with json', function (done) {
    request(app).post('/shares').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });

  it('accepts a json request with params of provider, link, editor, shared_at', function (done) {
    var data = {
      'provider': 'twitter',
      'link': 'http://somewhere.com',
      'editor': 'pietgeursen',
      'shared_at': 'now'
    };
    request(app).post('/shares').set('Accept', 'application/json').send(data).expect('Content-Type', /json/).expect(data, done);
  });

  it('rejects a json request with incorrect params', function (done) {
    var data = {
      'provider': 'twitter' };
    request(app).post('/shares').set('Accept', 'application/json').send(data).expect('Content-Type', /json/).expect(400, done);
  });

  after(function (done) {
    server.close();
    done();
  });
});
