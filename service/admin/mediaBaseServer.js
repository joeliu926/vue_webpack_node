/**
 * Created by admin on 2017-12-21.
 */
var CONSTANT=require('../../config/constant');
var httpClient=require('../../utils/httpClient');
var appUtil=require('../../utils/appUtils');
var loger=require('../../utils/loger');
var logingServer = require('../../security/loginserver');
const sessionAgent = require('../../security/sessionAgent.js');
var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/mediaBase',
    contentType:'application/json'
};
/**
 * 用户选择完上传的图片或视频等，点击提交按钮 弃用
 * @param req
 * @param res
 * @param next
 */
function create(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`/create`;
    let pData=req.body.pData;
    let oData=JSON.parse(pData)||[];
    oData.loginName=sessionAgent.getUserId(req);
    opt.data=oData;
    loger.info("create---mediaBase-----",oData);
    opt.url=encodeURI(opt.url);
    loger.info(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("create---mediaBase-----",error);
            res.send(error);
        }
        else {
            loger.info("create---mediaBase-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}

/**
 * 用户选择完上传的图片或视频等，点击提交按钮
 * @param req
 * @param res
 * @param next
 */
function uploadlocal(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`/uploadLocal`;
    let pData=req.body.pData;
    let oData=JSON.parse(pData)||[];
    oData.loginName=sessionAgent.getUserId(req);
    opt.data=oData;
    loger.info("uploadlocal---mediaBase-----",oData);
    opt.url=encodeURI(opt.url);
    loger.info(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("uploadlocal---mediaBase-----",error);
            res.send(error);
        }
        else {
            loger.info("uploadlocal---mediaBase-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}

/**
 *素材审核列表接口(1,"未审核"),(2,"已审核"),(3,"驳回")
 * @param req
 * @param res
 * @param next
 */
function pagelist(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    let pageNo = req.body.pageNo||"1";
    let pageSize = req.body.pageSize||"1";
    let busStatus = req.body.busStatus;
    let clinicId = req.body.clinicId||"";
    let loginName=sessionAgent.getUserId(req);
    opt.url+=`/pagelist?pageNo=${pageNo}&pageSize=${pageSize}&loginName=${loginName}&busStatus=${busStatus}`;
    opt.url=encodeURI(opt.url);

    loger.info(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("mediaBase---pagelist-----",error);
            res.send(error);
        }
        else {
            loger.info("mediaBase---list-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 用户查看详情信息
 * @param req
 * @param res
 * @param next
 */
function get(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let id = req.body.id;
    opt.url+=`/get/${id}`;
    opt.url=encodeURI(opt.url);
    loger.info(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("mediaBase---get-----",error);
            res.send(error);
        }
        else {
            loger.info("mediaBase---get-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 用户从待审核列表进入点击审核按钮
 * @param req
 * @param res
 * @param next
 */
function check(req, res, next){
    defualtCfg.method="PUT";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`/check`;

    let pData=req.body.pData;
    let oData=JSON.parse(pData)||{};
    oData.loginName=sessionAgent.getUserId(req);
    opt.data=oData;
    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("mediaBase---check------",error);
            res.send(error);
        }
        else {
            loger.info("mediaBase---check-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 编辑案例中点击加号，跳转到素材库列表 type =1图片 type =2视频
 * @param req
 * @param res
 * @param next
 */
function materialList(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let pageNo = req.body.pageNo||"1";
    let pageSize = req.body.pageSize||"1";
    let type = req.body.type;
    let customerName = req.body.customerName;
    let loginName=sessionAgent.getUserId(req);
    opt.url+=`/materialList?pageNo=${pageNo}&pageSize=${pageSize}&loginName=${loginName}&type=${type}&customerName=${customerName}`;
    //opt.data=req.body;
    //opt.url=encodeURI(opt.url);
    loger.info("-=-=-=-=-=-=-=-=-==-",opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("mediaBase---materialList-----",error);
            res.send(error);
        }
        else {
            loger.info("mediaBase---materialList-----",body);
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 * 获取缩略图
 * @param req
 * @param res
 * @param next
 */
function thumbnail(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let videoname = req.body.videoname;
    let loginName=sessionAgent.getUserId(req);
    opt.url=CONSTANT.remoteHost+":"+CONSTANT.remotePort+`/attachment/thumbnail?videoname=${videoname}`;
    loger.info("-=-=-=-=-=-=-=-=-==-",opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error("mediaBase---thumbnail-----",error);
            res.send(error);
        }
        else {
            loger.info("mediaBase---thumbnail-----",body);
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

    loger.info("test post");
    res.send({"name":"fsdgsdfgf"});
}
module.exports = {
    create:create,
    uploadlocal:uploadlocal,
    pagelist:pagelist,
    get:get,
    check:check,
    materialList:materialList,
    thumbnail:thumbnail,
    test:test

}

