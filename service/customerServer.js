var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/',
    contentType:'application/json'
};
/**
 * 获取客户列表
 * @param req
 * @param res
 * @param next
 */
function clist(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`/customer/list?pageNo=${req.body.pageNo}&pageSize=${req.body.pageSize}&startDate=${req.body.startDate}&endDate=${req.body.endDate}&fieldValue=${encodeURI(req.body.fieldValue)}&searchField=${req.body.searchField}&loginName=${sessionAgent.getUserId(req)}`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}
/**
 * 获取客户详情   V0.1
 * @param req
 * @param res
 * @param next
 */
function cdetail(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`customer/${req.body.id}`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}
/**
 * 客户文件列表
 * @param req
 * @param res
 * @param next
 */
function filelist(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`customer/fileList/${req.body.customerId}`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log('JSON.parse(body)',JSON.parse(body));
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}
/**
 * 更新客户信息
 * @param req
 * @param res
 * @param next
 */
function update(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`customer/update`;
    opt.data=req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log('update--;JSON.parse(body)',JSON.parse(body));
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}
/**
 * 获取客户咨询记录
 * @param req
 * @param res
 * @param next
 */
function records(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`consultation/getRecords/${req.body.id}`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}


module.exports = {
    clist: clist,
    cdetail:cdetail,
    filelist:filelist,
    records:records,
    update:update
}