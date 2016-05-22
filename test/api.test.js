'use strict';

/**
 * Moduel dependencies
 */

const path = require('path');
const util = require('util');

global.nconf = require('nconf').file({
    file: path.join(__dirname, '..', 'config', 'global.dev.json')
});

const pkg = require(path.join(__dirname, '..', 'package.json'));

/**
 * Tests
 */

const testName = util.format(
    '%s v%s',
    global.nconf.get('Server:Name'),
    pkg.version
);

describe(testName, function() {

    before(function(done) {
        require('../app').listen(done);
    });

    require(path.join(__dirname, 'routes', 'root'));
    require(path.join(__dirname, 'routes', 'auth'));
    require(path.join(__dirname, 'routes', 'news'));
    require(path.join(__dirname, 'routes', 'user'));

});
