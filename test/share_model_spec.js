'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var should = require('should');
var share = require('../db/share.js');
var mongoose = require('mongoose');
var Promise = require('bluebird');

var moment = require('moment');
var faker = require('faker');

describe('Shares', function () {
	var FakeShare = function FakeShare() {
		_classCallCheck(this, FakeShare);

		this.provider = 'twitter';
		this.link = faker.internet.domainName();
		this.editor = faker.internet.userName();
		this.created_at = moment().format();
	};

	var data = new FakeShare();

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
					saved_share.created_at.should.be.eql(shares.created_at);
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

		it('returns shares sorted by time ', function (done) {

			var newest = new FakeShare();
			var oldest = new FakeShare();
			var middleAged = new FakeShare();

			newest.link = oldest.link = middleAged.link;
			oldest.created_at = moment().subtract(2, 'days').format();
			middleAged.created_at = moment().subtract(1, 'days').format();

			var shares = [middleAged, newest, oldest];

			Promise.map(shares, function (data) {
				return share.add(data);
			}).then(function (savedShares) {
				return share.getByArticle(newest.link);
			}).then(function (loadedShares) {
				loadedShares.length.should.be.equal(shares.length);
				should.ok(moment(loadedShares[0].created_at).isBefore(loadedShares[1].created_at));
				should.ok(moment(loadedShares[1].created_at).isBefore(loadedShares[2].created_at));
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