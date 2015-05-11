'use strict';

var should = require('should');
var share = require('../db/share.js');
var mongoose = require('mongoose');

describe('Shares', function () {

	var data = {
		'provider': 'twitter',
		'link': 'http://somewhere.com',
		'editor': 'pietgeursen',
		'created_at': 'now'
	};

	before(function (done) {
		if (mongoose.connection.readyState) {
			return done();
		} else {
			mongoose.connect('mongodb://localhost/test', done);
		}
	});

	describe('Share#add', function () {

		it('creates a new share in the database', function (done) {
			share.add(data).spread(function (saved_share) {
				done();
			});
		});

		it('throws an error with incorrect params', function (done) {
			share.add({})['catch'](function (error) {
				done();
			});
		});
	});

	after(function (done) {
		mongoose.connection.close(function () {
			done();
		});
	});
});
