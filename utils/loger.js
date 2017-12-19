/**
 * Created by admin on 2017-12-19.
 */
var log4js = require('log4js');
var path=require('path');
var logInfoPath=path.join(__dirname,'./../public/logs/info-');
log4js.configure({
    appenders: {
        logConsole: {type: 'console'},
        logInfo: {
            type: 'dateFile',
            filename: logInfoPath,
            pattern: 'yyyy-MM-dd.log',
            maxLogSize: 10 * 1000 * 1000,
            numBackups: 7,
            encoding: "utf-8",
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {appenders: ['logConsole','logInfo'], level: 'info'}
    }
});
module.exports =log4js.getLogger('logInfo');
