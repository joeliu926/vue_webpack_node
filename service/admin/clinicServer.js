/**
 * Created by admin on 2017-12-21.
 */
var CONSTANT=require('../../config/constant');
var httpClient=require('../../utils/httpClient');
var appUtil=require('../../utils/appUtils');
var loger=require('../../utils/loger');
var logingServer = require('../../security/loginserver');
const sessionAgent = require('../../security/sessionAgent.js');
//var formidable =require('formidable');

//CONSTANT.remoteHost="http://172.16.6.85";
//CONSTANT.remotePort="8089";
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
 *获取诊所列表
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

    let pfile= req.body.file;
     loger.info("pfile-------",pfile);


/*    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.parse(req,function(err, fields, files){
        loger.info("------------->",files);
    });*/

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
