/**
 * Created by JoeLiu on 2017-10-30.
 */
const sessionAgent = require('./sessionAgent.js');
const CONSTANT = require('../config/constant.js');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtils');
var rsaconfig = require('../config/rsaConfig');
var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/api',
    contentType:'application/json'
};

exports.loginEntry=function (req,res) {
     defualtCfg.method="POST";
     var opt=appUtil.extend({},defualtCfg);
     req.body.password = rsaconfig.decrypt(req.body.password);
     req.body.name = rsaconfig.decrypt(req.body.name);
     opt.url+=`/users/login`;
     opt.data={loginName:req.body.name,password:req.body.password};
     opt.authorization =sessionAgent.getUserToken(req);
     opt.callBack=function(error, response, body) {

         if (error) {
             res.send({
                 code: CONSTANT.code.loginErr,
                 msg: 'login failure'
             });
         }
         else {
             body=JSON.parse(body);
             if (body.code == 0) {
                 sessionAgent.setUserId(req,body.data.loginName);
                 sessionAgent.setUserInfo(req,body.data);
                 sessionAgent.setUserToken(req,response.headers['authorization']);
                 res.send({
                     code: 0,
                     msg: '登陆成功'
                 });
             }
             else{
                 res.send({
                     code: CONSTANT.code.loginErr,
                     msg: 'login failure'
                 });
             }
         }
     }
     httpClient(opt);
}

exports.loginOutEntry=function (req,res) {
    //login code
    if(true){
        sessionAgent.deleteUserId(req);
        res.send({
            code:0,
            msg:'登出成功'
        });
    }
}