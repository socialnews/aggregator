var server = require('./app').server
var port = process.argv[2]
port =  port ? port : 3000

module.exports.start = function(port){
	server.start(port);
}

