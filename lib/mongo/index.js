"use strict";

const mongoose = require('mongoose'),
    nconf = require('../../config');
mongoose.Promise = global.Promise;
require('./users');

const databaseName = nconf.get('Database:Name');
if (nconf.get('NODE_ENV') == 'production') {
    mongoose.connect(`mongodb://mongo:27017/${databaseName}`);
} else {
    mongoose.connect(`mongodb://localhost/${databaseName}`);
}

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open ..OK. ');
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('\nMongoose disconnected on app termination');
        process.exit(0);
    });
});

exports.Users = mongoose.model("Users");
