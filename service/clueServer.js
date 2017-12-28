var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/clue/',
    contentType:'application/json'
};
/**
 * 线索更新
 * @param req
 * @param res
 * @param next
 */
function update(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let productName = req.body.productName;
    opt.url+=`update`;

    let EventData=req.body.EventData;
    opt.data=req.body;
    opt.url=encodeURI(opt.url);
    console.log(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("clue----update=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}

module.exports = {
    update:update
}