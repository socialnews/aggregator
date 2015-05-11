let should = require('should');
let share = require('../db/share.js');
let mongoose = require('mongoose');
let Promise = require('bluebird');



describe('Shares', () =>{

	let data = {
		'provider': 'twitter',
		'link' : 'http://somewhere.com',
		'editor' : 'pietgeursen',
		'created_at': 'now'
	}

	before((done) => {
		if (mongoose.connection.readyState){ 
			return done();
		}else{
			mongoose.connect('mongodb://localhost/test', done);
		}
	});

	describe('Share#add', () => {

		it('creates a new share in the database', (done) =>{
			share.add(data)
			.spread((saved_share) => {
				done();
			})
		})

		it('throws an error with incorrect params', (done) =>{
			share.add({})
			.catch((error) => {
				done();
			})
		})

	});


	describe('Share#getByArticle',  () => {

		it('finds a share by article',  (done) => {
			share.add(data).spread( (saved_share) => {
				share.getByArticle(data.link).spread ((shares) =>{
					(shares.link).should.be.equal(shares.link);
					(shares.provider).should.be.equal(shares.provider);
					(shares.editor).should.be.equal(shares.editor);
					(shares.created_at).should.be.equal(shares.created_at);
					done();
				})
			})
		})

		it('finds a collection of shares by article',  (done) => {

			let shares = [data,data,data];

			Promise.map(shares, (data) =>{
				return share.add(data)
			}).then((savedShares)=>{
				return share.getByArticle(data.link)
				
			}).then((loadedShares) => {
				(loadedShares.length).should.be.equal(shares.length);
				done();
			})
		})
	})

	afterEach((done) =>{
		mongoose.connection.collections['shares'].drop(function (err) {
			done();
		});
	})	

	after( done =>{
		mongoose.connection.collections['shares'].drop( (err) => {
		
			mongoose.connection.close( () => {
				done();
			})
		});
	})


})
