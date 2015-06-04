'use strict';

var mongoose = require('mongoose');
var express = require('express');
var shares = require('./routes/shares.js');
var article = require('./routes/article.js');
var app = express();
var nconf = require('nconf');

var bodyParser = require('body-parser');
var port = process.argv[2];
port = port ? port : 3000;

app.use(bodyParser.json()); // for parsing application/json

app.use('/shares', shares);
app.use('/article', article);

nconf.argv().file({ file: 'config.json' });

var url = nconf.get('production').database.url;

var start = function start(port) {

	var server = app.listen(port);
	var host = server.address().address;
	port = server.address().port;

	console.log('Aggregator listening at http://%s:%s', host, port);

	if (!mongoose.connection.db) {
		console.log('connecting to db at %s', url);
		mongoose.connect(url);
	}
	return server;
};

var gracefulExit = function gracefulExit() {
	mongoose.connection.close(function () {
		console.log('Mongoose connection with DB is disconnected through app termination');
		process.exit(0);
	});
};
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

exports.app = app;
exports.start = start(port);