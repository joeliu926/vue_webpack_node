/**
 * Created by admin on 2017-12-5.
 */
var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var logingServer = require('../security/loginserver');
const sessionAgent = require('../security/sessionAgent.js');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api/',
    contentType:'application/json'
};

// function getdata(req, res, next){
//     defualtCfg.method="GET";
//     var opt=appUtil.extend({},defualtCfg);
//
//     //let startD=req.body.beginDate?req.body.beginDate:'';
//     //  let endD = req.body.endDate?req.body.endDate:'';
//     opt.authorization =sessionAgent.getUserToken(req);
//     opt.url+=`product/list?loginName=${sessionAgent.getUserId(req)}`;
// //console.log(opt);
//     opt.callBack=function(error, response, body){
//         if(error)
//         {
//             res.send(error);
//         }
//         else {
//             body = JSON.parse(body);
//             res.send(body);
//         }
//     }
//     httpClient(opt);
// }

function getlist(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg);

    console.log('req.body.pageNo',req.body.pageNo);
    let pageNo=req.body.pageNo;
    let pageSize=req.body.pageSize;
    let status=req.body.status;
    let startDate=req.body.startDate;
    let endDate=req.body.endDate;
    console.log("pageNo",pageNo);
    opt.authorization =sessionAgent.getUserToken(req);
    opt.url+=`triage/list?pageNo=${pageNo}&pageSize=${pageSize}&status=${status}&startDate=${startDate}&endDate=${endDate}&loginName=${sessionAgent.getUserId(req)}`;
    //?pageNo=1&pageSize=10&repage=3&status=1
    //?pageNo=${pageNo}&pageSize=${pageSize}&repage=${repage}&status=${status}
    console.log("======",opt.url);
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

    getlist: getlist
}
