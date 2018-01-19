/**
 * Created by admin on 2018-1-19.
 */
/**
 * Created by admin on 2018-1-19.
 */
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
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/posterInfo',
    contentType:'application/json'
};

/**
 * 新建海报 api/posterInfo
 * @param req
 * @param res
 * @param next
 */
function addposter(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=``;
    req.body.loginName=sessionAgent.getUserId(req);
    opt.data=req.body;
    loger.info("posterInfo---add======>",opt.url);
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
/**
 * 海报列表查询（分页）/api/posterInfo/pagelist?loginName=13716466035&categoryId=3&pageNo=1&pageSize=1
 * @param req
 * @param res
 * @param next
 */
function pagelist(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    let loginName=sessionAgent.getUserId(req);
    let categoryId=req.body.categoryId;
    let pageNo=req.body.pageNo;
    let pageSize=req.body.pageSize;
    opt.url+=`/pagelist?loginName=${loginName}&categoryId=${categoryId}&pageNo=${pageNo}&pageSize=${pageSize}`;

   // opt.data=req.body;
    loger.info("posterInfo---pagelist======>",opt.url);
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

/**
 * 海报删除 api/posterInfo
 * @param req
 * @param res
 * @param next
 */
function posterdel(req, res, next){
    defualtCfg.method="DELETE";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=``;
    req.body.loginName=sessionAgent.getUserId(req);
    opt.data=req.body;
    loger.info("posterInfo---delete======>",opt.url);
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
    addposter:addposter,
    pagelist:pagelist,
    posterdel:posterdel
}

