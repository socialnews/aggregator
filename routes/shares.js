'use strict';

var express = require('express');
var router = express.Router();
var share = require('../db/share.js');
var mongoose = require('mongoose');

router.post('/', function (req, res) {

	share.add(req.body).then(function (saved_share) {
		res.json(saved_share);
	})['catch'](function (error) {

		res.status(400);
		res.json({ error: error });
	});
});

router.get('/', function (req, res) {
	var editor = req.query.editor;
	console.log(editor);
	share.getByEditor(editor).then(function (share) {
		res.json(share);
	})['catch'](function (error) {
		res.status(400);
		res.json({ error: error });
	});
});

module.exports = router;