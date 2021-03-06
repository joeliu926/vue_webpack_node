var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/customer/',
    contentType:'application/json'
};

function getrecord(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    let startD=req.body.beginDate?req.body.beginDate:'';
    let endD = req.body.endDate?req.body.endDate:'';
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`consultStatis?loginName=${sessionAgent.getUserId(req)}&beginDate=${startD}&endDate=${endD}`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}

function getrecord_scene(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    let startD=req.body.beginDate?req.body.beginDate:'';
    let endD = req.body.endDate?req.body.endDate:'';
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`faceDiagnoseStatis?loginName=${sessionAgent.getUserId(req)}&beginDate=${startD}&endDate=${endD}`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}

module.exports = {
    getrecord: getrecord,
    getrecord_scene:getrecord_scene
}