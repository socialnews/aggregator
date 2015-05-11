'use strict';

var BBPromise = require('bluebird');
var mongoose = require('mongoose');
var mongo = BBPromise.promisifyAll(require('mongodb'));
var MongoClient = mongo.MongoClient;

var shareSchema = require('./models/share_model').model;

var addShare = function addShare(share) {

	return mongoose.model('Share').createAsync(share);
};

var getByArticle = function getByArticle(article) {

	return mongoose.model('Share').findAsync({ link: article });
};

module.exports.add = addShare;
module.exports.getByArticle = getByArticle;
