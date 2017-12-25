/**
 * Created by admin on 2017-12-22.
 */
var CONSTANT=require('../../config/constant');
var httpClient=require('../../utils/httpClient');
var loger=require('../../utils/loger');
var appUtil=require('../../utils/appUtils');
var logingServer = require('../../security/loginserver');
const sessionAgent = require('../../security/sessionAgent.js');

var defualtCfg={
    url:"http://140.143.185.73:8083/api/",
    contentType:'application/json'
};
/**
 * 测试
 * @param req
 * @param res
 * @param next
 */
function getProductModel(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`product/getProductModel`;
    console.log("model's url=============>",opt.url);
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
function list(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`product/list?loginName=${sessionAgent.getUserId(req)}`;
    console.log("url=============>",opt.url);
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
function select(req, res, next){
    let  a;
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`product/updateProduct`;
    a=JSON.parse(req.body.objValues);
    a["loginName"]=sessionAgent.getUserId(req);
    opt.data=a;
    console.log("aaaa===>",a);
    console.log("url=============>",opt.url);
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
    getProductModel:getProductModel,
    list:list,
    select:select
}