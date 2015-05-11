let should = require('should');
let share = require('../db/share.js');
let mongoose = require('mongoose');



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
	})

	after( done =>{
		mongoose.connection.close( () => {
			done();
		})
	})


})
