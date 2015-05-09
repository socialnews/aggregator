'use strict';

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
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
	} });

var Share = mongoose.model('Share', ShareSchema);

var share = new Share({ name: 'Zildjian' });
share.save(function (err) {
	if (err) {} // ...

	else {
		Share.find(function (err, share) {
			if (err) return console.error(err);
			console.log(share);
			mongoose.disconnect();
		});
	}
});
