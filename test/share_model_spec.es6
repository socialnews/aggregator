let should = require('should');
let share = require('../db/share.js');
let mongoose = require('mongoose');
let Promise = require('bluebird');

let moment = require('moment');
let faker = require('faker');



describe('Shares', () =>{

	class FakeShare {

		constructor(){

			this.provider = 'twitter'
			this.link  = faker.internet.domainName()
			this.editor  = faker.internet.userName()
			this.created_at = moment().format()				
		}
	}

	let data = new FakeShare()

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
			.then((saved_share) => {
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
			share.add(data).then( (saved_share) => {
				share.getByArticle(data.link).spread ((shares) =>{

					(saved_share.link).should.be.equal(shares.link);
					(saved_share.provider).should.be.equal(shares.provider);
					(saved_share.editor).should.be.equal(shares.editor);
					(saved_share.created_at).should.be.eql(shares.created_at);
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


		it('returns shares sorted by time ',  (done) => {

			let newest = new FakeShare()
			let oldest = new FakeShare()
			let middleAged = new FakeShare()
			
			newest.link = oldest.link = middleAged.link;
			oldest.created_at = moment().subtract(2,'days').format()
			middleAged.created_at = moment().subtract(1,'days').format()

			let shares = [
				middleAged,
				newest,
				oldest
				];	

			Promise.map(shares, (data) =>{
				return share.add(data)
			}).then((savedShares)=>{
				return share.getByArticle(newest.link)
				
			}).then((loadedShares) => {
				(loadedShares.length).should.be.equal(shares.length);
				should.ok(moment(loadedShares[0].created_at).isBefore(loadedShares[1].created_at))
				should.ok(moment(loadedShares[1].created_at).isBefore(loadedShares[2].created_at))
				done();
			})
		})
	})

	afterEach((done) =>{
		mongoose.connection.collections['shares'].drop( (err) => {
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
