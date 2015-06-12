let BBPromise = require('bluebird');
let mongoose = require('mongoose');
let mongo = BBPromise.promisifyAll(require('mongodb'));
let MongoClient = mongo.MongoClient;

BBPromise.promisifyAll(mongoose);


let shareSchema = require('./models/share_model').model;

let addShare = (share) => {
	return  mongoose.model('Share')
		.createAsync(share);
}

let getByArticle = (article) => {
	return mongoose.model('Share')
		.find({link: article}).sort({created_at: 1}).execAsync();
}

let getByUserID = (providerUserID) => {
	return mongoose.model('Share')
		.find({providerUserID: providerUserID}).sort({created_at: 1}).execAsync();
}

let destroyAll = () => {
	return mongoose.model('Share')
		.removeAsync({});
}

module.exports.add = addShare;
module.exports.getByArticle = getByArticle;
module.exports.getByUserID = getByUserID;
module.exports.destroyAll = destroyAll;

