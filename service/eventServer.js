var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/event/',
    contentType:'application/json'
};
/**
 * 模糊搜索获取下拉列表 api/product/searchList?loginName=15711367520&productName=开
 * @param req
 * @param res
 * @param next
 */
function pcevent(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);

    opt.authorization =sessionAgent.getUserToken(req);
    let productName = req.body.productName;
    opt.url+=`v2`;

    let EventData=JSON.parse(req.body.EventData);
    EventData.subjectAttrs={
        consultantId: sessionAgent.getUserId(req)
    }
    //opt.data=req.body;
    opt.data=EventData;
    opt.url=encodeURI(opt.url);
    console.log(opt.url);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            console.log("pc----event=====>",JSON.parse(body));
            body = JSON.parse(body);
            res.send(body);
        }
    }
    httpClient(opt);
}

module.exports = {
    pcevent:pcevent
}