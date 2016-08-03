'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        index: true,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    createTime: {
        type: Date,
        required: true
    },
    updatedTime: {
        type: Date,
        default: Date.now
    }
});
