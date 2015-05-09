'use strict';

var should = require('should');
var request = require('supertest');
var app = require('../app.js').app;

describe('POST /shares', function () {
  it('respond with json', function (done) {

    request(app).post('/shares').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
});
