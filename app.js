'use strict';

var mongoose = require('mongoose');
var express = require('express');
var shares = require('./routes/shares.js');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

app.use('/shares', shares);

var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

if (!mongoose.connection.db) {
	mongoose.connect(url);
}

exports.app = app;
exports.server = server;
