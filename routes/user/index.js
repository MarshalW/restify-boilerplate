'use strict';

const logger = require('../../utils/logging');

/**
 * Routes
 */

var routes = [];

/**
 * GET /
 * Version: 1.0.0
 */

routes.push({
    meta: {
        name: 'getUser',
        method: 'GET',
        paths: [
            '/user/:id'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        let userName = req.user != null ? req.user.userName : '--';

        res.send({
            results: {
                userName
            }
        });
        return next();
    }
});

/**
 * Export
 */

module.exports = routes;
