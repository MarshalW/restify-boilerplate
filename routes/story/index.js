
'use strict';

const logger=require('../../utils/logging');

var routes = [];

routes.push({
    meta: {
        name: 'getStories',
        method: 'GET',
        paths: [
            '/story'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        res.send({
            result: {
                storyItems: [
                    {sid: 1, content: '这是一个很有趣的故事'},
                    {sid: 2, content: '这真的是一个很有趣的故事'}
                ]
            }
        });
        return next();
    }
});

routes.push({
    meta: {
        name: 'getStoryById',
        method: 'GET',
        paths: [
            '/story/:sid'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        var sid=req.params.sid;
        res.send({
            results: {
                sid: sid,
                content: '有趣的故事'+sid
            }
        });
        return next();
    }
});

routes.push({
    meta: {
        name: 'insertStory',
        method: 'POST',
        paths: [
            '/story'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        res.send({
            results: {
                status: 'insert success' 
            }
        });
        return next();
    }
});

routes.push({
    meta: {
        name: 'deleteStory',
        method: 'DELETE',
        paths: [
            '/story/:sid'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        res.send({
            results: {
                sid: req.params.sid,
                status: 'delete success'
            }
        });
        return next();
    }
});

routes.push({
    meta: {
        name: 'updateStory',
        method: 'PUT',
        paths: [
            '/story/:sid'
        ],
        version: '1.0.0'
    },
    action: function(req, res, next) {
        res.send({
            results: {
                sid: req.params.sid,
                status: 'update success'
            } 
        });
        return next();
    }
});

module.exports = routes;