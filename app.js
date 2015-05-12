'use strict';

var mongoose = require('mongoose');
var express = require('express');
var shares = require('./routes/shares.js');
var article = require('./routes/article.js');
var app = express();

var url = 'mongodb://localhost/test';

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

app.use('/shares', shares);
app.use('/article', article);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

if (!mongoose.connection.db) {
  console.log('connecting to db...');
  mongoose.connect(url);
}

var gracefulExit = function gracefulExit() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection with DB is disconnected through app termination');
    process.exit(0);
  });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

exports.app = app;
exports.server = server;
