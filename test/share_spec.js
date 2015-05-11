'use strict';

var should = require('should');
var share = require('../db/share.js');
var mongoose = require('mongoose');
var Promise = require('bluebird');

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
			share.add(data).then(function (saved_share) {
				done();
			});
		});

		it('throws an error with incorrect params', function (done) {
			share.add({})['catch'](function (error) {
				done();
			});
		});
	});

	describe('Share#getByArticle', function () {

		it('finds a share by article', function (done) {
			share.add(data).then(function (saved_share) {
				share.getByArticle(data.link).spread(function (shares) {

					saved_share.link.should.be.equal(shares.link);
					saved_share.provider.should.be.equal(shares.provider);
					saved_share.editor.should.be.equal(shares.editor);
					saved_share.created_at.should.be.equal(shares.created_at);
					done();
				});
			});
		});

		it('finds a collection of shares by article', function (done) {

			var shares = [data, data, data];

			Promise.map(shares, function (data) {
				return share.add(data);
			}).then(function (savedShares) {
				return share.getByArticle(data.link);
			}).then(function (loadedShares) {
				loadedShares.length.should.be.equal(shares.length);
				done();
			});
		});
	});

	afterEach(function (done) {
		mongoose.connection.collections['shares'].drop(function (err) {
			done();
		});
	});

	after(function (done) {
		mongoose.connection.collections['shares'].drop(function (err) {

			mongoose.connection.close(function () {
				done();
			});
		});
	});
});
