let BBPromise = require('bluebird');
let mongo = BBPromise.promisifyAll(require('mongodb'));
let MongoClient = mongo.MongoClient;

let shareSchema = require('./models/share_model').model;

let addShare = (share) => {
  // connect to mongo
  // mongoose.connect(url);
  return new shareSchema(share)
  	.saveAsync();
}


module.exports.add = addShare;

