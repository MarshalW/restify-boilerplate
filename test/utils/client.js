'use strict';

const path = require('path');
// const nconf = require('nconf').file({
//   file: path.join(__dirname, '..', '..', 'config', 'global.json')
// });

const request = require('supertest')('http://localhost:' + global.nconf.get('Server:Port'));
module.exports=request;