'use strict';

var express = require('express');
var router = express.Router();
var share = require('../db/share.js');
var mongoose = require('mongoose');

router.post('/', function (req, res) {

	console.log(req.body);

	share.add(req.body, function (err) {

		if
		console.log('saved share to db: ', share);
		res.json(share);
	});
});

module.exports = router;
