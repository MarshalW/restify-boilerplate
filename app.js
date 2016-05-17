'use strict';

const restify = require('restify');
const path = require('path');

const nconf = require('nconf').file({
  file: path.join(__dirname, 'config', 'global.json')
});

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer({
	name:nconf.get('Server:name')
});
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});