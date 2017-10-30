/**
 * Created by JoeLiu on 2017-10-23.
 */

var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var logingServer = require('../security/loginserver');
//var appUtil=require('../utils/appUtil');
var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/dashboard/platform',
    contentType:'application/json'
};

function userate(req, res, next){

    res.send({'aaa':'aaaa'});
    /*
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+=`/resource/trend`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);*/
}
function usertimes(req,res,next){
	 res.send({'usertimes':'this is user times aaaaa'});
}
//登录
function loginEntry(req,res,next){
    logingServer.loginEntry(req,res);
}
//登出
function loginOutEntry(req,res,next){
    logingServer.loginOutEntry(req,res);
}

module.exports = {
    userate: userate,
    usertimes:usertimes,
    loginEntry:loginEntry,
    loginOutEntry:loginOutEntry
}