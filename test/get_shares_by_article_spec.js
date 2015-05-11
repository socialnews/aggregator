'use strict';

var request = require('supertest');
var should = require('should');
var app = require('../app.js').app;
var server = require('../app.js').server;

var simple = require('simple-mock');
var share = require('../db/share.js');

describe('GET /article?url=some-urlencoded-url', function () {

  var data = {
    'provider': 'twitter',
    'link': 'http://somewhere.com',
    'editor': 'pietgeursen',
    'created_at': 'now'
  };

  var query = { url: 'http%3A%2F%2Fmongoosejs.com%2Fdocs%2Fmodels.html' };

  var getByArticleSpy = undefined;

  it('responds with json', function (done) {
    getByArticleSpy = simple.mock(share, 'getByArticle').resolveWith([data]);
    request(app).get('/article').set('Accept', 'application/json').query(query).expect('Content-Type', /json/).expect(200, done);
  });

  it('expects a query string where {url: encoded_url} ', function (done) {
    getByArticleSpy = simple.mock(share, 'getByArticle').resolveWith([data]);
    request(app).get('/article').set('Accept', 'application/json').query(query).expect('Content-Type', /json/).expect(200, function () {
      getByArticleSpy.lastCall.args[0].should.be.eql(decodeURIComponent(query.url));
      done();
    });
  });

  after(function (done) {
    simple.restore();
    server.close();
    done();
  });
});
