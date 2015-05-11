let mongoose   = require('mongoose');
let express = require('express');
let shares = require('./routes/shares.js');
let article = require('./routes/article.js');
let app = express();

let url = 'mongodb://localhost/test'

let bodyParser = require('body-parser')

app.use(bodyParser.json()); // for parsing application/json

app.use('/shares', shares );
app.use('/article', article );

let server = app.listen(3000,  () => {

	let host = server.address().address;
	let port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});

if (!mongoose.connection.db) {
	console.log('connecting to db...')
  	mongoose.connect(url);
}

let gracefulExit = () => { 
  mongoose.connection.close( () => {
    console.log('Mongoose default connection with DB is disconnected through app termination');
    process.exit(0);
  });
}
 
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);


exports.app = app;
exports.server = server;


