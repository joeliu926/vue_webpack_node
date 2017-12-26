/**
 * Created by JoeLiu on 2017-10-23.
 */

var CONSTANT=require('../../config/constant');
var httpClient=require('../../utils/httpClient');
var appUtil=require('../../utils/appUtils');
const sessionAgent = require('../../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/',
    contentType:'application/json'
};

function prompt(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`prompt/list?loginName=${sessionAgent.getUserId(req)}`;
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
    prompt:prompt
}