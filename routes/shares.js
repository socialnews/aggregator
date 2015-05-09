'use strict';

var express = require('express');
var router = express.Router();
var Share = require('../models/share.js').share;
var mongoose = require('mongoose');

router.post('/', function (req, res) {

	// mongoose.connect('mongodb://localhost/test')

	// let share = new Share(req.body);

	// share.save(function (err) {
	//   if (err){
	//   	console.log('Blowout')
	//   	res.json({error: err})
	//   }

	//   else{
	//   	Share.find(function (err, share) {
	//   	  if (err){
	//   	  	res.json({error: err})
	//   	  	return console.error(err);
	//   	  }
	//   	  console.log(share)
	//   	  res.json(share);
	//   	})
	//   }
	// });

	// db.connection.close();
	// res.json(share);
	res.json(req.body);
});

module.exports = router;
