var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');


var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/customer/',
    contentType:'application/json;charset=UTF-8'
};

function clist(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    opt.url+=`list?pageNo=${req.body.pageNo}&pageSize=${req.body.pageSize}&startDate=${req.body.startDate}&endDate=${req.body.endDate}&fieldValue=${encodeURI(req.body.fieldValue)}&searchField=${req.body.searchField}`;
   console.log(opt.url);
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
    clist: clist
}