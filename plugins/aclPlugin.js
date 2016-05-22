"use strict";

const path = require('path');
const util = require('util');

const restify = require('restify');
const ACL = require('acl');

const nconf = require('../config');
const logger = require('../utils/logging');

/**
 * ACL
 */

let acl;
const getACLInstance = function(aclBackend) {

    if (acl) {
        return acl;
    }

    aclBackend = aclBackend || {
        type: 'memory'
    };

    aclBackend = aclBackend.type === 'memory' ? new ACL.memoryBackend() : aclBackend.type === 'redis' ? aclBackend = new ACL.redisBackend(aclBackend.options.client, aclBackend.options.prefix) : aclBackend.type === 'mongodb' ? aclBackend = new ACL.mongodbBackend(aclBackend.options.client, aclBackend.options.prefix) : new ACL.memoryBackend();

    acl = new ACL(aclBackend);

    const rules = nconf.get('Security:ACL:Rules');
    const users = nconf.get('Security:Users');

    acl.allow(rules);

    users.forEach(function(user) {
        acl.addUserRoles(user.userId, user.role);
    });

    return acl;
};

/**
 * Export
 */

module.exports = function(aclBackend) {
    return function(req, res, next) {
        req.acl = getACLInstance(aclBackend);

        const resource = util.format('%s#%s', req.route.path, req.route.version);
        const permission = req.method.toLowerCase();

        req.acl.isAllowed(req.user.userId, resource, permission, function(err, isAllowed) {
            if (!!err) {
                console.log(err);
                return next(new restify.InternalError());
            }

            if (!isAllowed) {
                return next(new restify.ForbiddenError());
            }

            return next();
        });
    }
};
