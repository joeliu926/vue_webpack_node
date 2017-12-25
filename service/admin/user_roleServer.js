/**
 * Created by JoeLiu on 2017-10-23.
 */

var CONSTANT=require('../../config/constant');
var httpClient=require('../../utils/httpClient');
var logingServer = require('../../security/loginserver');
var appUtil=require('../../utils/appUtils');
const sessionAgent = require('../../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/',
    contentType:'application/json'
};

function rolelist(req, res, next){
    defualtCfg.method="GET";

    //console.log('------------',sessionAgent.getUserInfo(req));
    let userInfo = sessionAgent.getUserInfo(req);

    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`roles/list?tenantId=${userInfo.tenantId}&userId=${userInfo.id}`;
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

function rolelistpage(req, res, next){
    defualtCfg.method="GET";

    //console.log('------------',sessionAgent.getUserInfo(req));
    let userInfo = sessionAgent.getUserInfo(req);

    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`roles?tenantId=${userInfo.tenantId}&userId=${userInfo.id}&pageNo=${req.body.pageNo}&pageSize=${req.body.pageSize}`;
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



function userlist(req, res, next){
    defualtCfg.method="GET";
    let userInfo = sessionAgent.getUserInfo(req);
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);

    console.log('req.body.name',req.body.name);
    req.body.name = encodeURI(req.body.name);
    opt.url+=`users?tenantId=${userInfo.tenantId}&pageNo=${req.body.pageNo}&pageSize=${req.body.pageSize}&name=${req.body.name?req.body.name:''}`;

    console.log('req.body',req.body);

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


function getuserinfo(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`users/${req.body.userId}`;
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



function getroleinfo(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`resource/permission`;
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



function updateuser(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`users/saveOrUpdate`;
    opt.data=req.body;
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


function deleteuser(req, res, next){
    defualtCfg.method="DELETE";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`users/${req.body.userId}`;
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
function updateuserrole(req, res, next){
    defualtCfg.method="POST";
    let userInfo = sessionAgent.getUserInfo(req);
    //userInfo.tenantId
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`roles/setting`;
    opt.data = JSON.parse(req.body.objValue);
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

function unbind(req, res, next){
    defualtCfg.method="POST";
    let userInfo = sessionAgent.getUserInfo(req);
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`users/unbind?userId=${req.body.userId}&from=wx`;
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

function resetpwd(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`users/resetpwd?userId=${req.body.userId}`;
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
    unbind:unbind,
    resetpwd:resetpwd,
    rolelist: rolelist,
    rolelistpage: rolelistpage,
    userlist:userlist,
    getuserinfo:getuserinfo,
    getroleinfo:getroleinfo,
    updateuser:updateuser,
    deleteuser:deleteuser,
    updateuserrole:updateuserrole
}