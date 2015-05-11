'use strict';

var BBPromise = require('bluebird');
var mongo = BBPromise.promisifyAll(require('mongodb'));
var MongoClient = mongo.MongoClient;

var shareSchema = require('./models/share_model').model;

var addShare = function addShare(share) {
  return new shareSchema(share).saveAsync();
};

module.exports.add = addShare;
