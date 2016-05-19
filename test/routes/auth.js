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

const route = '/auth';

const testName = util.format(
    'Auth [%s]',
    route
);

const userInfo={
  userName:'zhangsan',
  password:'P@ssw0rd'
};

describe(testName, function() {
    let token;

    before(function(done) {
        request.post(`${route}/signIn`)
            .set('Accept', 'application/json')
            .field('userName', userInfo.userName)
            .field('password', userInfo.password)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                token = res.body.results.token;
                // assert.ok(res.body.results.token);
                // testAuthFromHeader(res.body.results.token);
                done();
            });
    });

    it('正确token访问', (done) => {
        assert.ok(token);
        request.get('/news')
            .set('Accept', 'application/json')
            .set('Authorization',`Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                assert.ok(res.body.results);
                assert.equal(res.body.results.userName,userInfo.userName);
                done();
            });
    });

    it('错误token访问', (done) => {
        assert.ok(token);
        request.get('/news')
            .set('Accept', 'application/json')
            .set('Authorization',`Bearer ${token}1`)
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
                if (err) throw err;
                assert.equal(res.body.code,'InvalidCredentials');
                done();
            });
    });

});
