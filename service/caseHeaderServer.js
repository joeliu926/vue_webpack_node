var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/caseHeader/',
    contentType:'application/json'
};
/**
 * 获取案例相关的医生列表 api/caseHeader/doctorList?loginName=15711367520&productCode=3001
 * @param req
 * @param res
 * @param next
 */
function doctorList(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let productCode = req.body.productCode;
    opt.url+=`doctorList?loginName=${sessionAgent.getUserId(req)}&productCode=${productCode}`;
    opt.url=encodeURI(opt.url);
    console.log(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("doctorList=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 获取项目案例列表 /api/caseHeader/list?loginName=15711367520&productCode=3001
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let productCode = req.body.productCode;
    let doctorId = req.body.doctorId;
    opt.url+=`list?loginName=${sessionAgent.getUserId(req)}&productCode=${productCode}&doctorId=${doctorId}`;
    opt.url=encodeURI(opt.url);
    console.log(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("caseHeader---list=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}

module.exports = {
    doctorList:doctorList,
     list:list
}