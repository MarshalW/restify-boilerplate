'use strict';

const path = require('path');

const request = require('supertest')('http://localhost:' + global.nconf.get('Server:Port'));
module.exports = request;
