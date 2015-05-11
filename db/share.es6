let BBPromise = require('bluebird');
let mongoose = require('mongoose');

let shareSchema = require('./models/share_model').model;

let addShare = (share) => {

	return new shareSchema(share)
	.saveAsync();
}


let getByArticle = (article) => {

	return mongoose.model('Share')
		.findAsync({link: article});
}

module.exports.add = addShare;
module.exports.getByArticle = getByArticle;

