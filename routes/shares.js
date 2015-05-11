'use strict';

var express = require('express');
var router = express.Router();
var share = require('../db/share.js');
var mongoose = require('mongoose');
// let share = mongoose.model('Share');

router.post('/', function (req, res) {

	share.add(req.body).spread(function (saved_share) {
		res.json(saved_share);
	})['catch'](function (error) {
		res.status(400);
		res.json({ error: error });
	});
});

module.exports = router;
