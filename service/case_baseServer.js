var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/',
    contentType:'application/json'
};

function getdata(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`product/list?loginName=${sessionAgent.getUserId(req)}`;
    //console.log("url",opt.url);
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

function caselibrary(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`caseHeader/list?loginName=${sessionAgent.getUserId(req)}&productCode=${req.body.id}`;
    //console.log("url------->",opt.url);
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


function getrecord(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    console.log('req.body.caseid',req.body.caseid);
    let caseid=req.body.caseid;
    console.log("caseid",caseid);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`caseHeader/${caseid}`;//${caseid}
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


function setFacePhone(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    let caseid=req.body.caseid;
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`caseHeader/setCover`;
    opt.data={
            "id":caseid,
            "beforePic":req.body.beforePic,
            "afterPic":req.body.afterPic
    }
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



module.exports = {
    getdata: getdata,
    getrecord: getrecord,
    setFacePhone:setFacePhone,
    caselibrary:caselibrary
}
