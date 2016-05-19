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

const route = '/user';

const testName = util.format(
    'User [%s]',
    route
);

describe(testName, function() {

    it('获取指定用户信息', function(done) {
        const userId = 123;
        request.get(`${route}/${userId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                assert.ok(res.body.results.userName);
                done();
            });
    });

});
