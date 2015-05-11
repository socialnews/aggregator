let BBPromise = require('bluebird');
let mongoose = require('mongoose');
let mongo = BBPromise.promisifyAll(require('mongodb'));
let MongoClient = mongo.MongoClient;

let shareSchema = require('./models/share_model').model;

let addShare = (share) => {

	return  mongoose.model('Share')
		.createAsync(share);
}


let getByArticle = (article) => {

	return mongoose.model('Share')
		.findAsync({link: article});
}

module.exports.add = addShare;
module.exports.getByArticle = getByArticle;

