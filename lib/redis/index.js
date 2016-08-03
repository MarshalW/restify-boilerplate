"use strict";

const redis = require("redis"),
    bluebird = require("bluebird"),
    nconf = require('../../config');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = (function() {
    if (nconf.get('NODE_ENV') == 'production') {
        return redis.createClient(6379, 'redis');
    }
    return redis.createClient();
})();

client.on("error", (err) => {
    console.log("Error " + err);
});

client.on("connect", () => {
    console.log("redis connection open ..OK.");
});


exports.client = client;
