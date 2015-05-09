let express = require('express');
let shares = require('./routes/shares.js');
let app = exports.app = express();

app.use('/shares', shares ); 

let server = exports.server = app.listen(3000,  () => {

	let host = server.address().address;
	let port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});



