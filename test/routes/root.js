'use strict';

/**
 * Moduel dependencies
 */

const path = require('path');
const util = require('util');
const assert = require('assert');
const request = require('../utils/client');

/**
 * Tests
 */

const route = '/';

const testName = util.format(
    'Root [%s]',
    route
);

describe(testName, function() {

    it('访问根目录，获取WebApp名称', function(done) {
        request.get(route)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                assert.equal(res.body.name, global.nconf.get('Server:Name'));
                done();
            });
    });

});
