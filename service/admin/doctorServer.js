/**
 * Created by admin on 2017-12-21.
 */
var CONSTANT=require('../../config/constant');
var httpClient=require('../../utils/httpClient');
var loger=require('../../utils/loger');
var appUtil=require('../../utils/appUtils');
var logingServer = require('../../security/loginserver');
const sessionAgent = require('../../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/doctor/',
    contentType:'application/json'
};
/**
 * 测试
 * @param req
 * @param res
 * @param next
 */
function test(req, res, next){
    loger.info("test doctor");
    res.send({"test":"this is a test"});

}

module.exports = {
    test:test
}