'use strict';

var should = require('should');
var share = require('../db/share.js');
var mongoose = require('mongoose');

describe('Shares', function () {

  before(function (done) {
    //Another possibility is to check if mongoose.connection.readyState equals 1
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/test', done);
  });

  describe('Share#add', function (done) {

    it('creates a new share in the database', function (done) {

      done();
    });

    it('throws an error with incorrect params', function (done) {
      done();
    });
  });

  after(function (done) {
    mongoose.connection.close(function () {
      done();
    });
  });
});
