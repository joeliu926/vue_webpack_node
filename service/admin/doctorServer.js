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
 * 新建医生
 * @param req
 * @param res
 * @param next
 */
function create(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`create`;
    let pData=req.body.pData;
    let oData=JSON.parse(pData)||{};
    oData.loginName=sessionAgent.getUserId(req);
    opt.data=oData;
    loger.info("create---oData-----",oData);
    //opt.url=encodeURI(opt.url);
    loger.info(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("create---erroe-----",error);
            res.send(error);
        }
        else {
            loger.info("create---body-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 *获取医生列表
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let pageNo = req.body.pageNo||"1";
    let pageSize = req.body.pageSize||"1";
    let parentTenantId = req.body.parentTenantId||"";
    let clinicId = req.body.clinicId||"";
    let loginName=sessionAgent.getUserId(req);
    opt.url+=`pagelist?pageNo=${pageNo}&pageSize=${pageSize}&parentTenantId=${parentTenantId}&clinicId=${clinicId}&loginName=${loginName}`;
    opt.url=encodeURI(opt.url);

    loger.info(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("clinic---list-----",error);
            res.send(error);
        }
        else {
            loger.info("clinic---list-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 获取单条医生信息
 * @param req
 * @param res
 * @param next
 */
function get(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let id = req.body.id;
    opt.url+=`get/${id}`;
    opt.url=encodeURI(opt.url);
    loger.info(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("clinic---get-----",error);
            res.send(error);
        }
        else {
            loger.info("clinic---get-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 更新医生信息
 * @param req
 * @param res
 * @param next
 */
function update(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`update`;

    let pData=req.body.pData;
    let oData=JSON.parse(pData)||{};
    oData.loginName=sessionAgent.getUserId(req);
    opt.data=oData;

    //opt.data=req.body;
    //opt.url=encodeURI(opt.url);
    loger.info(opt.url,oData);
    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("clinic---update------",error);
            res.send(error);
        }
        else {
            loger.info("clinic---update-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 删除医生信息
 * @param req
 * @param res
 * @param next
 */
function deleteC(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`delete`;
    opt.data=req.body;
    opt.url=encodeURI(opt.url);
    loger.info(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("clinic---delete-----",error);
            res.send(error);
        }
        else {
            loger.info("clinic---delete-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}





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
    create:create,
    list:list,
    get:get,
    update:update,
    deleteC:deleteC,
    test:test
}