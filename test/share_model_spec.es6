let should = require('should');
let share = require('../db/share.js');
let mongoose = require('mongoose');



describe('Shares', () =>{




  before((done) => {
    //Another possibility is to check if mongoose.connection.readyState equals 1
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/test', done);
  });

  describe('Share#add', done => {
  	
  	it('creates a new share in the database', (done) =>{

  		done();

  	})

  	it('throws an error with incorrect params', (done) =>{
  		done();
  	})


  })




  after( done =>{
  	mongoose.connection.close( () => {
	   done();
	})
  })


})
