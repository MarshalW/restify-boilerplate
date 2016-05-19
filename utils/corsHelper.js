'use strict';

/**
 * Module dependencies.
 */

const restify = require('restify');

/**
 * CORS helper
 */

const CORSHelper = function(options) {

    const allowedOrigins = options.origins || [];
    const allowedHeaders = restify.CORS.ALLOW_HEADERS.concat(options.headers || []);

    const unknownMethodHandler = function(req, res) {

        const origin = req.headers.origin;
        const originAllowed = false;

        // Skip if it's not a preflight request
        if (req.method.toLowerCase() !== 'options') {
            return res.send(new restify.MethodNotAllowedError());
        }

        allowedOrigins.forEach(function(anOrigin) {
            if (origin.toLowerCase() === anOrigin.toLowerCase()) {
                originAllowed = true;
            }
        });

        if (!originAllowed) {
            res.header('Access-Control-Allow-Origin', '');
            return res.send(new restify.MethodNotAllowedError());
        }

        res.header('Access-Control-Allow-Headers', allowedHeaders.join(', '));

        return res.send(200);

    };

    return unknownMethodHandler;
};

/**
 * Export
 */

module.exports = CORSHelper;
