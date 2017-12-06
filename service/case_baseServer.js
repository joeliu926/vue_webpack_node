var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/',
    contentType:'application/json;charset=UTF-8'
};

function getdata(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    //let startD=req.body.beginDate?req.body.beginDate:'';
  //  let endD = req.body.endDate?req.body.endDate:'';
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`product/list?loginName=${sessionAgent.getUserId(req)}`;
    console.log("url",opt.url);
//console.log(opt);
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
function getList(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    console.log('req.body.caseid',req.body.caseid);
    let caseid=req.body.caseid;
    // console.log("caseid",caseid);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`caseHeader/list`;//${caseid}
    console.log("======",opt);
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            body = JSON.parse(body);
            console.log('bores',body);
            res.send(body);
        }
    }
    httpClient(opt);
}



function getrecord(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    console.log('req.body.caseid',req.body.caseid);
    let caseid=req.body.caseid;
    console.log("caseid",caseid);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`caseHeader/5`;//${caseid}
    console.log("======",opt);
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            body = JSON.parse(body);
            console.log('bores',body);
            res.send(body);
        }
    }
    httpClient(opt);
}

module.exports = {
    getdata: getdata,
    getrecord: getrecord,
    getList:getList
}
