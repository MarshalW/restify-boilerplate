'use strict';

// import restify from 'restify';
const restify = require('restify');
const path = require('path');

global.nconf = require('nconf').file({
  file: path.join(__dirname, 'config', 'global.json')
});

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

const server = restify.createServer({
	name:nconf.get('Server:name')
});

const plugins = [
  restify.acceptParser(server.acceptable),
  restify.dateParser(),
  restify.queryParser(),
  restify.fullResponse(),
  restify.bodyParser(),
  restify.gzipResponse()
];

server.use(plugins);

/**
 * CORS
 */

const corsOptions = {
  origins: nconf.get('CORS:Origins'),
  credentials: nconf.get('CORS:Credentials'),
  headers: nconf.get('CORS:Headers')
};

server.pre(restify.CORS(corsOptions));

if (corsOptions.headers.length) {
  server.on('MethodNotAllowed', require(path.join(__dirname, 'utils', 'corsHelper.js'))());
}

const registerRoute = function(route) {

  let {method:routeMethod,name:routeName,version:routeVersion}=route.meta;
  routeMethod=routeMethod.toLowerCase();
  if(routeMethod=='delete'){
    routeMethod='del';
  }

  route
    .meta
    .paths
    .forEach(function(aPath) {
      var routeMeta = {
        name: routeName,
        path: aPath,
        version: routeVersion
      };
      server[routeMethod](routeMeta, route.action);
    });

};

const setupRoute = function(routeName) {
  const routes = require(path.join(__dirname, 'routes', routeName));
  routes.forEach(registerRoute);
};

[
  'root',
  'news'
]
.forEach(setupRoute);


/**
 * Listen
 */

const listen=function(done){
	server.listen(nconf.get('Server:Port'), function() {
		if (done) {
	      return done();
	    }
		console.log('%s listening at %s', server.name, server.url);
	});
}

if (!module.parent) {
  listen();
}

/**
 * Export
 */

module.exports.listen = listen;

