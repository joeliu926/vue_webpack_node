/**
 * Created by admin on 2018-2-1.
 */
var CONSTANT=require('../../config/constant');
var httpClient=require('../../utils/httpClient');
var appUtil=require('../../utils/appUtils');
var logingServer = require('../../security/loginserver');
const sessionAgent = require('../../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/gift',
    contentType:'application/json'
};


/*礼品添加 */

function addgift(req, res, next){
    // res.send({"BBBBB":"jjjjjjjjjjj"});
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);

    opt.url+=``;
    console.log(opt.url);
    let pdata=req.body.postData;
    opt.data=JSON.parse(pdata);
    opt.data.loginName = sessionAgent.getUserId(req);
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

/*礼品详情展示 初始化数据*/
function editgift(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    let id=req.body.id||"";
    opt.url+=`/${id}`;
    console.log("================",req.body);
    opt.url=encodeURI(opt.url);
    console.log(opt.url,"555555555555555");
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


/*礼品列表*/
function giftlist(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    console.log('req.body.pageNo',req.body.pageNo);
    let pageNo=req.body.pageNo||1;
    let pageSize=req.body.pageSize||12;
    let loginName=sessionAgent.getUserId(req);
    opt.url+=`/pagelist/?pageNo=${pageNo}&pageSize=${pageSize}&loginName=${loginName}`;
    opt.url=encodeURI(opt.url);
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

/*礼品下架*/
function giftdelte(req, res, next){
    defualtCfg.method="DELETE";

    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);

    let id=req.body.id;
    opt.data=req.body;
    opt.url+=``;
    opt.url=encodeURI(opt.url);
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


/*礼品更新*/
function editgiftNew(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    let pdata=req.body.date;
    // console.log("pdata=========================>>>>>>>>>>",pdata);
    opt.data=JSON.parse(pdata);

    opt.data.loginName = sessionAgent.getUserId(req);
    opt.url+=``;
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
    addgift:addgift,
    editgift:editgift,
    giftlist:giftlist,
    giftdelte:giftdelte,//下架
    editgiftNew:editgiftNew,

}