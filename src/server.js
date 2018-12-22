'use strict'

const config = require("./config");
const restify = require("restify");

const server = restify.createServer({
	name: config.name,
	version: config.version
});


server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var routes = require('./ir/routes')(server);


server.listen(8000, "0.0.0.0", function(){
	console.log('%s listening at %s', server.name, server.url)
});


