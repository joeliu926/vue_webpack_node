/**
 * Created by JoeLiu on 2017-10-30.
 */
/**
 * 用户代理，
 * @type {exports}
 */
var CONSTANT = require("../config/constant.js");
function setUserName(req,v){
    req.session[CONSTANT.session.userName]=v;
}

function getUserName(req){
    return req.session[CONSTANT.session.userName]
}
function setUserInfo(req,info){
    req.session[CONSTANT.session.caasUserInfo]=info;
}

function getUserInfo(req){
    return req.session[CONSTANT.session.caasUserInfo]
}

function setUserResource(req,resources){
    req.session[CONSTANT.session.resourceCode]=resources;
}
function getUserResource(req){
    return 	req.session[CONSTANT.session.resourceCode];
}
/**
 * 资源检查
 * @param req
 * @param resource
 * @returns {boolean} true 有资源 false 无资源
 */
function checkUserResource(req,resource){
    var res=req.session[CONSTANT.session.resourceCode];
    if(res&&res.length&&res.indexOf(resource)>-1){
        return true;
    }else{
        return false;
    }
}

function deleteUserId(req){
    delete req.session[CONSTANT.session.userId];
}
function setUserId(req,id){
    req.session[CONSTANT.session.userId]=id;
}
function getUserId(req){
    return req.session?req.session[CONSTANT.session.userId]:null;
}

module.exports ={
    deleteUserId:deleteUserId,
    setUserName:setUserName,
    getUserName:getUserName,
    setUserInfo:setUserInfo,
    getUserInfo:getUserInfo,
    setUserResource:setUserResource,
    getUserResource:getUserResource,
    checkUserResource:checkUserResource,
    setUserId:setUserId,
    getUserId:getUserId
};