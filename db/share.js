'use strict';

var BBPromise = require('bluebird');
var mongoose = require('mongoose');

var shareSchema = require('./models/share_model').model;

var addShare = function addShare(share) {

	return new shareSchema(share).saveAsync();
};

var getByArticle = function getByArticle(article) {

	return mongoose.model('Share').findAsync({ link: article });
};

module.exports.add = addShare;
module.exports.getByArticle = getByArticle;
