var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/customer/',
    contentType:'application/json;charset=UTF-8'
};

function getrecord(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    let startD=req.body.beginDate?req.body.beginDate:'';
    let endD = req.body.endDate?req.body.endDate:'';

    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`consultStatis?loginName=${sessionAgent.getUserId(req)}&beginDate=${startD}&endDate=${endD}`;
    console.log('opt',opt);
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {

            console.log('body111111111111',body);
            body = JSON.parse(body);

            res.send(body.data);
        }
    }
    httpClient(opt);
}

module.exports = {
    getrecord: getrecord,
}