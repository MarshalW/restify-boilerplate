'use strict';

const restify = require('restify');

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
        const userId = req.params.id;

        req.acl.hasRole(req.user.userId, "admin", (err, hasRole) => {
            if (err) throw err;
            if (!hasRole && userId != req.user.userId) {
                return next(new restify.errors.ForbiddenError('can not get other user info.'));
            }

            const userName = userId == '123' ? "zhangsan" : "tom";
            res.send({
                results: {
                    userName
                }
            });
            return next();
        });
    }
});

/**
 * Export
 */

module.exports = routes;
