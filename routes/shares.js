'use strict';

var express = require('express');
var router = express.Router();
var share = require('../db/share.js');
var mongoose = require('mongoose');

router.post('/', function (req, res) {

	share.add(req.body).spread(function (saved_share) {
		res.json(saved_share);
	});
});

module.exports = router;
