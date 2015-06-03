'use strict';

var request = require('supertest');
var should = require('should');
var app = require('../app.js').app;
var server = require('../app.js').server;

var simple = require('simple-mock');
var share = require('../db/share.js');

describe('GET /shares/editor_id', function () {

  var data = {
    'provider': 'twitter',
    'link': 'http://somewhere.com',
    'editor': 'pietgeursen',
    'created_at': 'now'
  };

  var query = { editor: 'piet' };

  var getShareByEditor = function getShareByEditor() {
    return request(app).get('/shares').query(query).set('Accept', 'application/json').expect('Content-Type', /json/);
  };

  it('responds with json', function (done) {
    var getByEditorSpy = simple.mock(share, 'getByEditor').resolveWith([data]);
    getShareByEditor().expect(200, done);
  });

  it('Returns 200 with a correct query', function (done) {
    var getByEditorSpy = simple.mock(share, 'getByEditor').resolveWith([data]);
    getShareByEditor().expect(200, function () {
      getByEditorSpy.lastCall.args[0].should.be.eql(query.editor);
      done();
    });
  });

  after(function (done) {
    simple.restore();
    server.close();
    done();
  });
});