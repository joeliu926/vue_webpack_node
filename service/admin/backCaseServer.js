
/**
 * Created by JoeLiu on 2017-10-23.
 */
var CONSTANT=require('../../config/constant');
var httpClient=require('../../utils/httpClient');
var appUtil=require('../../utils/appUtils');
var logingServer = require('../../security/loginserver');
const sessionAgent = require('../../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/',
    contentType:'application/json'
};
/* 案例列表 */
function caselist(req, res, next){
    // res.send({"AAAAAAA":"uuuuuuu"});

    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    console.log('req.body.pageNo',req.body.pageNo);
    let pageNo=req.body.pageNo||1;
    let pageSize=req.body.pageSize||12;
    let loginName=sessionAgent.getUserId(req);
    let productName=req.body.productName||"";
    let doctorId=req.body.doctorId||"";

    // let startDate=req.body.startDate;
    // let endDate=req.body.endDate;
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`caseHeader/listPage?pageNo=${pageNo}&pageSize=${pageSize}&productName=${productName}&loginName=${loginName}&doctorId=${doctorId}`;
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

/*案例添加*/

function caseadd(req, res, next){
    // res.send({"BBBBB":"jjjjjjjjjjj"});
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);

    opt.url+=`caseHeader/buildCase`;
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

/*案例修改*/
function caseupdate(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`caseHeader/updateCase`;
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


/*案例详情*/
function casedetail(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`caseHeader/${req.body.id}`;
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

/*案例的联想下拉*/
function selectcaselist(req, res, next){


    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    let loginName=sessionAgent.getUserId(req);
    let productName=req.body.productName||"";
    opt.url+=`/product/searchList?loginName=${loginName}&productName=${productName}`;
    console.log(opt.url);
    opt.url=encodeURI(opt.url);
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
/*设置 医生*/
function setdoctorlist(req, res, next){


    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    let loginName=sessionAgent.getUserId(req);
    opt.url+=`/doctor/list?loginName=${loginName}`;
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

/*案例删除*/
function casedelete(req, res, next){
    defualtCfg.method="DELETE";

    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    let id=req.body.id;
    opt.url+=`caseHeader/${id}`;
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


module.exports = {
    casedetail:casedetail,
    caseupdate:caseupdate,
    caselist: caselist,
    caseadd: caseadd,
    casedelete:casedelete,
    setdoctorlist:setdoctorlist,
    selectcaselist:selectcaselist,
}