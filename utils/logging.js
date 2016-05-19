'use strict';

const fs = require('fs');
const winston = require('winston');
const moment = require('moment');
const stackTrace = require('stack-trace');
const _ = require('underscore');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');

const nconf=require('../config');

const dateFormat = function() {
    return moment().format('YYYY-MM-DD HH:mm:ss:SSS');
};

const LOGGER_FILE_MAX_SIZE = 1024 * 1024 * 20;

const consoleLoggerTransport = new winston.transports.Console({
    timestamp: dateFormat,
    colorize: true
});

let defaultLoggerTransport, errorTransport;

const transports = [];

if (nconf.get('NODE_ENV') === 'production') {
    defaultLoggerTransport = new DailyRotateFile({
        name: 'defaultLog',
        filename: path.join(nconf.get('Logging:Dir'), 'app.log'),
        timestamp: dateFormat,
        level: 'info',
        colorize: true,
        maxsize: LOGGER_FILE_MAX_SIZE,
        datePattern: '.yyyy-MM-dd'
    });

    errorTransport = new(winston.transports.File)({
        name: 'error',
        filename: path.join(nconf.get('Logging:Dir'), 'error.log'),
        timestamp: dateFormat,
        level: 'error',
        humanReadableUnhandledException: true,
        json: false,
        colorize: true
    });

    transports.push(defaultLoggerTransport);
    transports.push(errorTransport);

    // 崩溃日志
    const crashLogger = new(winston.Logger)({
        transports: [
            new(winston.transports.File)({
                name: 'error',
                filename: path.join(nconf.get('Logging:Dir'), 'crash.log'),
                level: 'error',
                handleExceptions: true,
                timestamp: dateFormat,
                humanReadableUnhandledException: true,
                json: false,
                colorize: true
            })
        ]
    });
} else {
    transports.push(consoleLoggerTransport);
}

const logger = new(winston.Logger)({
    transports: transports
});

// 测试崩溃日志
// setTimeout(()=>{
// 	throw new Error('crash.. !!!');
// },1000*5);

// 代理logger.error方法，加入文件路径和行号信息
let originalMethod = logger.error;
logger.error = function() {
    let cellSite = stackTrace.get()[1];
    originalMethod.apply(logger, [arguments[0] + '\n', {
        filePath: cellSite.getFileName(),
        lineNumber: cellSite.getLineNumber()
    }]);
}

// 测试错误日志
// setTimeout(()=>{
// 	logger.error('test error!!!');
// },1000*5);

// 设置自定义的logger
logger.setCustomLoggers = function(loggers) {
    loggers.forEach((log) => {
        if (nconf.get('NODE_ENV') === 'production') {
            let transport;
            switch (log.loggerOptions.type) {
                case 'file':
                    transport = new DailyRotateFile({
                        name: log.name,
                        filename: path.join(nconf.get('Logging:Dir'), `${log.loggerOptions.fileName}.log`),
                        timestamp: dateFormat,
                        level: log.loggerOptions.level,
                        maxsize: LOGGER_FILE_MAX_SIZE,
                        json: log.loggerOptions.json,
                        datePattern: '.yyyy-MM-dd'
                    });
                    break;
                default:
            }
            logger[log.name] = new(winston.Logger)({
                transports: [transport]
            });
            logger[log.name].add(defaultLoggerTransport, {}, true);
            logger[log.name].add(errorTransport, {}, true);
        } else {
            logger[log.name] = new(winston.Logger)({
                transports: [consoleLoggerTransport]
            });
        }
    });
}

module.exports = logger;
