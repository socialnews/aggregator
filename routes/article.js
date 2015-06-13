'use strict';

var express = require('express');
var router = express.Router();
var share = require('../db/share.js');
var mongoose = require('mongoose');

router.get('/', function (req, res) {

	var url = decodeURIComponent(req.query.url);

	share.getByArticle(url).then(function (shares) {
		res.json(shares);
	})['catch'](function (error) {
		res.status(400);
		res.json({ error: error });
	});
});

module.exports = router;