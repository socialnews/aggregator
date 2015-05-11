'use strict';

var mongoose = require('mongoose');
var BBPromise = require('bluebird');
var Schema = mongoose.Schema;

var ShareSchema = new Schema({
	schemaVersion: String,

	editor: {
		type: String,
		required: 'Editors must have a name'
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
		type: String,
		required: 'created_at must not be blank'
	}

});

var Share = undefined;

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
