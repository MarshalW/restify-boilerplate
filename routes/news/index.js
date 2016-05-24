'use strict';

const logger = require('../../utils/logging');

/**
 * Routes
 */

const routes = [];

/**
 * GET /news
 * Version: 1.0.0
 */

routes.push({
    meta: {
        name: 'getNews',
        method: 'GET',
        paths: [
            '/news'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        const userName = req.user != null ? req.user.userName : null;
        res.send({
            results: {
                userName,
                newsItems: [{
                    id: 100,
                    title: '研究称全球联网将使世界经济获益6.7万亿美元'
                }, {
                    id: 107,
                    title: '商务部三举措促电商发展'
                }]
            }
        });
        return next();
    }
});

/**
 * GET /news/:id
 * Version: 1.0.0
 */

routes.push({
    meta: {
        name: 'getNewsWithId',
        method: 'GET',
        paths: [
            '/news/:id'
        ],
        version: '1.0.0'
    },
    action: [(req, res, next) => {
        logger.info('读取新闻====>>>');
        next();
    }, function(req, res, next) {
        const newsId = req.params.id;
        // /news/124?flag=true
        // console.log(req.params.flag);
        res.send({
            results: {
                id: newsId,
                title: '研究称全球联网将使世界经济获益6.7万亿美元'
            }
        });
        return next();
    }]
});

/**
 * POST /news
 * Version: 1.0.0
 */

routes.push({
    meta: {
        name: 'postNews',
        method: 'POST',
        paths: [
            '/news'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        console.log(req.params);
        res.send({
            results: {
                id: 103
            }
        });
        return next();
    }
});

/**
 * DELETE /news/:id
 * Version: 1.0.0
 */

routes.push({
    meta: {
        name: 'deleteNews',
        method: 'DELETE',
        paths: [
            '/news/:id'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        res.send({
            results: {
                id: req.params.id
            }
        });
        return next();
    }
});

/**
 * Export
 */

module.exports = routes;
