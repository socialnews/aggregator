let mongoose   = require('mongoose');
let express = require('express');
let shares = require('./routes/shares.js');
let app = express();

let bodyParser = require('body-parser')

app.use(bodyParser.json()); // for parsing application/json

app.use('/shares', shares );

let server = app.listen(3000,  () => {

	let host = server.address().address;
	let port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});

if (!mongoose.connection.db) {
  mongoose.connect(url);
}

exports.app = app;
exports.server = server;


