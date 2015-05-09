let express = require('express');
let shares = require('./routes/shares.js');
let app = express();

let bodyParser = require('body-parser')
let multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use('/shares', shares );

let server = exports.server = app.listen(3000,  () => {

	let host = server.address().address;
	let port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});


exports.app = app;


