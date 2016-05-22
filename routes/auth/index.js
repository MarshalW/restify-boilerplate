"use strict";

const restify = require('restify');
const jwt = require('jsonwebtoken');

const logger = require('../../utils/logging');
const nconf = require('../../config');

/**
 * Routes
 */

const routes = [];

/**
 * POST /auth/signIn
 * Version: 1.0.0
 */

routes.push({
    meta: {
        name: 'signIn',
        method: 'POST',
        paths: [
            '/auth/signIn'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        const {
            userName,
            password
        } = req.params;

        if (userName == null || password == null) {
            return next(new restify.InvalidArgumentError("Sign in params error."));
        }

        logger.debug(`userName: ${userName}, password: ${password}`);

        //TODO 查询是否一致，并获取用户ID

        const userId = userName == 'zhangsan' ? "123" : "007";

        const authInfo = {
            userId,
            userName
        };
        const token = jwt.sign(authInfo, nconf.get('Security:SecretSigningKey'));
        res.send({
            results: {
                token
            }
        });
        return next();
    }
});

module.exports = routes;
