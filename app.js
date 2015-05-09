'use strict';

var express = require('express');
var shares = require('./routes/shares.js');
var app = exports.app = express();

app.use('/shares', shares);

var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
