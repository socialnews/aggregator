'use strict';

var mongoose = require('mongoose');
// var timestamps = require('mongoose-timestamp');
var BBPromise = require('bluebird');

var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

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

var Share = mongoose.model('Share', ShareSchema);
BBPromise.promisifyAll(Share);
BBPromise.promisifyAll(Share.prototype);
exports.name = 'Share';
exports.model = Share;

var share = new Share({
	editor: 'Piet',
	provider: 'Twitter',
	link: 'somewhere.com',
	created_at: 'now'
});

share.save(function (err) {
	if (err) {
		console.log('Blowout');
	} else {
		Share.find(function (err, share) {
			if (err) return console.error(err);
			console.log(share);
			mongoose.disconnect();
		});
	}
});
