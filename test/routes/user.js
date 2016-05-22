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
    describe(`${testName} - from guest`, function() {
        it('游客不能获取指定用户信息', function(done) {
            const userId = 123;
            request.get(`${route}/${userId}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(403)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe(`${testName} - from customer`, function() {
        const user = {
            userName: 'zhangsan',
            password: 'P@ssw0rd'
        };

        let token;

        before(function(done) {
            request.post('/auth/signIn')
                .set('Accept', 'application/json')
                .field('userName', user.userName)
                .field('password', user.password)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    token = res.body.results.token;
                    assert.ok(res.body.results.token);
                    done();
                });
        });

        it('用户可获取自己用户信息', function(done) {
            const userId = "123";
            request.get(`${route}/${userId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    assert.ok(res.body.results.userName);
                    done();
                });
        });

        it('用户不可获取其他用户信息', function(done) {
            const userId = "007";
            request.get(`${route}/${userId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(403)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                });
        });
    });

    describe(`${testName} - from admin`, function() {
        const user = {
            userName: 'tom',
            password: 'P@ssw0rd'
        };

        let token;

        before(function(done) {
            request.post('/auth/signIn')
                .set('Accept', 'application/json')
                .field('userName', user.userName)
                .field('password', user.password)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    token = res.body.results.token;
                    assert.ok(res.body.results.token);
                    done();
                });
        });

        it('管理员可获取自己用户信息', function(done) {
            const userId = "007";
            request.get(`${route}/${userId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    done();
                });
        });

        it('管理员可获取其他用户信息', function(done) {
            const userId = "123";
            request.get(`${route}/${userId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    assert.ok(res.body.results.userName);
                    done();
                });
        });
    });

});
