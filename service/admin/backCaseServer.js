
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
    let pageNo=req.body.pageNo;
    let pageSize=req.body.pageSize;
    let loginName=req.body.loginName;
    let productName=req.body.productName;
    let doctorId=req.body.doctorId;

    // let startDate=req.body.startDate;
    // let endDate=req.body.endDate;

    console.log("pageNo",pageNo);
    console.log("pageSize",pageSize);


    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`caseHeader/listPage?pageNo=${pageNo}&pageSize=${pageSize}&productName=${productName}&loginName=${loginName}&doctorId=${doctorId}`;
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
function uploadPicture(req, res, next){
    // res.send({"BBBBB":"jjjjjjjjjjj"});
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`caseHeader/buildCase`;
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

/*案例修改*/
function caseupdata(req, res, next){
    res.send({"CCCCCCCCCCCCC":"tttttttttttttt"});

    // defualtCfg.method="GET";
    // var opt=appUtil.extend({},defualtCfg);
    // opt.authorization =sessionAgent.getUserToken(req);
    // opt.url+=`doctor/list?tenantId=${req.body.tenantId}&userId=${req.body.userId}`;
    // console.log(opt.url);
    //
    // opt.callBack=function(error, response, body){
    //     if(error)
    //     {
    //         res.send(error);
    //     }
    //     else {
    //         res.send(JSON.parse(body));
    //     }
    // }
    // httpClient(opt);
}


module.exports = {
    caselist: caselist,
    caseadd: caseadd,
    caseupdata: caseupdata,
    uploadPicture:uploadPicture

}