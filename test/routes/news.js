'use strict';

/**
 * Moduel dependencies
 */

const util = require('util');
const assert = require('assert');
const request = require('../utils/client');

/**
 * Tests
 */

const route = '/news';

const testName = util.format(
    'News [%s]',
    route
);

describe(testName, function() {

    describe(`${testName} - from guest`, function() {
        it('游客可以访问新闻列表', function(done) {
            request.get(route)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    assert.ok(res.body.results);
                    assert.ok(res.body.results.newsItems);
                    assert.ok(res.body.results.newsItems.length == 2);
                    done();
                });
        });

        it('游客可以访问新闻正文', function(done) {
            const newsId='123';
            request.get(`${route}/${newsId}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    assert.ok(res.body.results);
                    done();
                });
        });


        it('游客不能创建新闻', function(done) {
            request.post(route)
                .field('title', 'news title')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(403)
                .end((err, res) => {
                    if (err) throw err;
                    // assert.ok(res.body.results);
                    // assert.ok(res.body.results.id);
                    done();
                });
        });

        it('游客不能删除新闻', function(done) {
            request.del(route + '/123')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(403)
                .end((err, res) => {
                    if (err) throw err;
                    // assert.ok(res.body.results);
                    // assert.ok(res.body.results.id);
                    done();
                });
        });
    });

    describe(`${testName} - from customer`, () => {
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

        it('用户可以访问新闻列表', function(done) {
            request.get(route)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    assert.ok(res.body.results);
                    assert.ok(res.body.results.newsItems);
                    assert.ok(res.body.results.newsItems.length == 2);
                    done();
                });
        });

        it('用户不能创建新闻', function(done) {
            request.post(route)
                .field('title', 'news title')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(403)
                .end((err, res) => {
                    if (err) throw err;
                    // assert.ok(res.body.results);
                    // assert.ok(res.body.results.id);
                    done();
                });
        });

        it('用户不能删除新闻', function(done) {
            request.del(route + '/123')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(403)
                .end((err, res) => {
                    if (err) throw err;
                    // assert.ok(res.body.results);
                    // assert.ok(res.body.results.id);
                    done();
                });
        });
    });

    describe(`${testName} - from admin`, () => {
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

        it('管理员可以访问新闻列表', function(done) {
            request.get(route)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    assert.ok(res.body.results);
                    assert.ok(res.body.results.newsItems);
                    assert.ok(res.body.results.newsItems.length == 2);
                    done();
                });
        });

        it('管理员可以创建新闻', function(done) {
            request.post(route)
                .field('title', 'news title')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    assert.ok(res.body.results);
                    assert.ok(res.body.results.id);
                    done();
                });
        });

        it('管理员可以删除新闻', function(done) {
            request.del(route + '/123')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) throw err;
                    assert.ok(res.body.results);
                    assert.ok(res.body.results.id);
                    done();
                });
        });
    });

});
