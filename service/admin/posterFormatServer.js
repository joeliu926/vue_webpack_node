var CONSTANT=require('../../config/constant');
var httpClient=require('../../utils/httpClient');
var loger=require('../../utils/loger');
var appUtil=require('../../utils/appUtils');
var logingServer = require('../../security/loginserver');
const sessionAgent = require('../../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/posterFormat',
    contentType:'application/json'
};
/**
 * 版式列表查询（分页） /api/posterFormat/pagelist
 * @param req
 * @param res
 * @param next
 */
function pagelist(req, res, next){
    defualtCfg.method="GET";
    let opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    let loginName=sessionAgent.getUserId(req);
    let pageNo=req.body.pageNo;
    let pageSize=req.body.pageSize;
    opt.url+=`/pagelist?loginName=${loginName}&pageNo=${pageNo}&pageSize=${pageSize}`;
   // opt.data=req.body;
    opt.url=encodeURI(opt.url);
    loger.info(opt.url);
    opt.callBack=function(error, response, body){
        if(error)
        {
            loger.error(error);
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
    pagelist:pagelist
}