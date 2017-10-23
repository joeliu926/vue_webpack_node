/**
 * Created by JoeLiu on 2017-10-23.
 */

var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
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

module.exports = {
    userate: userate
}