'use strict';

const users = require('./init.json');
const bcrypt = require('bcrypt');
const nconf = require('../');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const databaseName = nconf.get("Database:Name");
