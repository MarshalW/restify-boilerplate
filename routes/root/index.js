'use strict';

const logger = require('../../utils/logging');
const nconf=require('../../config');

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
        name: 'getRoot',
        method: 'GET',
        paths: [
            '/'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        logger.info('access /');
        res.send({
            name: nconf.get('Server:Name')
        });
        return next();
    }
});

/**
 * Export
 */

module.exports = routes;
