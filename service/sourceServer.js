var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/source/',
    contentType:'application/json'
};
/**
 *获取客户渠道列表 api/source/list?loginName=Andrew
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let all = req.body.all;
    //let productCode = req.body.productCode;
    opt.url+=`list?loginName=${sessionAgent.getUserId(req)}`;
    opt.url=encodeURI(opt.url);
    console.log(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("source=list====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}
module.exports = {
    list:list
}