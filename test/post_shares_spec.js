'use strict';

var should = require('should');
var request = require('supertest');
var app = require('../app.js').app;
var server = require('../app.js').server;
var mongoose = require('mongoose');

describe('POST /shares', function () {

  before(function (done) {
    //Another possibility is to check if mongoose.connection.readyState equals 1
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/test', done);
  });

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
