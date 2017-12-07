var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/faceDiagnose/',
    contentType:'application/json'
};
/**
 * 未面诊 api/faceDiagnose/notFaceDiagnoseList
 * @param req
 * @param res
 * @param next
 */
function getNotFaceDiagnoseList(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`notFaceDiagnoseList?loginName=${sessionAgent.getUserId(req)}`;

    console.log(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("getNotFaceDiagnoseList=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 已面诊api/faceDiagnose/endList?loginName=15711367520&pageNo=1&pageSize=10
 * @param req
 * @param res
 * @param next
 */
function getEndList(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    let pageNo=req.body.pageNo;
    let pageSize = req.body.pageSize;
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`endList?loginName=${sessionAgent.getUserId(req)}&pageNo=${pageNo}&pageSize=${pageSize}`;

    console.log(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("getEndList=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 结束咨询  /api/faceDiagnose/finished/{flag} 结果标识，0-成功，1-复诊，2-放弃
 * @param req
 * @param res
 * @param next
 */
function finished(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);

    let flag=req.body.flag;
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`finished/${flag}`;
    opt.data=req.body;
    console.log(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("finished=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 获取客户资料  api/faceDiagnose/getCustomerData?appointmentId=48&customerId=4
 * @param req
 * @param res
 * @param next
 */
function getCustomerData(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let appointmentId = req.body.appointmentId;
    let customerId = req.body.customerId;
    opt.url+=`getCustomerData?appointmentId=${appointmentId}&customerId=${customerId}`;
    opt.data=req.body;

    console.log(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("getCustomerData=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 更新客户资料
 * @param req
 * @param res
 * @param next
 */
function newFaceDiagnose(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let appointmentId = req.body.appointmentId;
    let customerId = req.body.customerId;
    opt.url+=`newFaceDiagnose`;
    opt.data=req.body;
    opt.data.loginName=sessionAgent.getUserId(req);
    console.log(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("newFaceDiagnose=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
module.exports = {
    getNotFaceDiagnoseList: getNotFaceDiagnoseList,
    getEndList:getEndList,
    finished:finished,
    getCustomerData:getCustomerData,
    newFaceDiagnose:newFaceDiagnose
}