/**
 * Created by admin on 2017-12-21.
 */
var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var loger=require('../utils/loger');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/clinic/',
    contentType:'application/json'
};
/**
 * 创建诊所
 * @param req
 * @param res
 * @param next
 */
function create(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`create`;
    opt.data=req.body;
    //opt.url=encodeURI(opt.url);
    loger.info(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.info("create---erroe-----",error);
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
 *获取诊所列表
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let pageNo = req.body.pageNo;
    let pageSize = req.body.pageSize;
    let parentTenantId = req.body.parentTenantId;
    let clinicId = req.body.clinicId;
    opt.url+=`list?pageNo=${pageNo}&pageSize=${pageSize}&parentTenantId=${parentTenantId}&clinicId=${clinicId}`;
    opt.url=encodeURI(opt.url);

    loger.info(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.info("clinic---list-----",error);
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
 * 获取单条诊所信息
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
            loger.info("clinic---get-----",error);
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
 * 更新诊所信息
 * @param req
 * @param res
 * @param next
 */
function update(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`update`;

    opt.data=req.body;
    opt.url=encodeURI(opt.url);
    loger.info(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.info("clinic---update------",error);
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
 * 删除诊所信息
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
            loger.info("clinic---delete-----",error);
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
    loger.info("test post");
    res.send({"name":"fsdgsdfgf"});
}
module.exports = {
    create:create,
    list:list,
    get:get,
    update:update,
    deleteC:deleteC,
    test:test

}
