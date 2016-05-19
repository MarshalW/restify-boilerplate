"use strict";

const path = require('path');

const configFileName =
    process.env.NODE_ENV === 'production' ?
    'global.product.json' : 'global.dev.json';

const nconf = require('nconf')
    .argv()
    .env()
    .file({
        file: path.join(__dirname, configFileName)
    });

module.exports = nconf;
