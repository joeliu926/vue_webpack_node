var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/product/',
    contentType:'application/json;charset=UTF-8'
};
/**
 * 模糊搜索获取下拉列表 api/product/searchList?loginName=15711367520&productName=开
 * @param req
 * @param res
 * @param next
 */
function searchList(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let productName = req.body.productName;
    opt.url+=`searchList?loginName=${sessionAgent.getUserId(req)}&productName=${productName}`;
    opt.url=encodeURI(opt.url);
    console.log(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("searchList=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
/**
 *获取项目列表
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let all = req.body.all;
    opt.url+=`list?loginName=${sessionAgent.getUserId(req)}&all=${all}`;
    opt.url=encodeURI(opt.url);
    console.log(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("searchList=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
module.exports = {
    searchList:searchList,
    list:list
}