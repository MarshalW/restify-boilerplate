"use strict";

const jwt = require('jsonwebtoken');
const restify = require('restify');

const logger = require('../utils/logging');
const nconf = require('../config');

module.exports = function() {
    return function(req, res, next) {
        let token;
        if (req.headers && req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');

            if (parts.length < 2) {
                return next(new restify.InvalidCredentialsError('Format is Authorization: Bearer [token]'));
            }

            const [scheme, credentials] = parts;

            if (!/^Bearer$/i.test(scheme)) {
                return next(new restify.InvalidCredentialsError('Format is Authorization: Bearer [token]'));
            }

            token = credentials;
            try {
                const dtoken = jwt.verify(token, nconf.get('Security:SecretSigningKey'));
                req.user = dtoken;
            } catch (err) {
                return next(new restify.InvalidCredentialsError(err));
            }
        }else{
          req.user={
            userId:'100',
            userName:'guest'
          };
        }
        return next();
    }
};
