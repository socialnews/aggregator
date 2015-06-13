let mongoose = require('mongoose');
let BBPromise = require('bluebird');
let Schema = mongoose.Schema;

let ShareSchema = new Schema({
	schemaVersion: String,

	providerUserID: {
		type: String,
		required: 'Must have a provider ID'
	},
	provider: {
		type: String,
		required: 'Provider must not be blank'
	},
	link: {
		type: String,
		required: 'links must not be blank'
	},
	created_at: {
		type: Date,
		required: 'created_at must not be blank'
	}

})

let Share;

if (mongoose.models.Share) {
  Share = mongoose.model('Share');
} else {
  Share = mongoose.model('Share', ShareSchema);
}


// let Share = mongoose.model('Share', ShareSchema);
BBPromise.promisifyAll(Share);
BBPromise.promisifyAll(Share.prototype);
exports.name = 'Share';
exports.model = Share;



