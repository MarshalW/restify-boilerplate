
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

const route = '/news';

const testName = util.format(
  'News [%s]',
  route
);

describe(testName, function() {

  it('访问新闻列表',function(done){
  	request.get(route)
    .set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.end((err,res)=>{
			if(err) throw err;
			assert.ok(res.body.results);
      assert.ok(res.body.results.newsItems);
      assert.ok(res.body.results.newsItems.length==2);
			done();
		});
  });

  it('创建新闻',function(done){
    request.post(route)
    .field('title','news title')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err,res)=>{
      if(err) throw err;
      assert.ok(res.body.results);
      assert.ok(res.body.results.id);
      done();
    });
  });

  it('删除新闻',function(done){
    request.del(route+'/123')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err,res)=>{
      if(err) throw err;
      assert.ok(res.body.results);
      assert.ok(res.body.results.id);
      done();
    });
  });

});