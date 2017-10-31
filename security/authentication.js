/**
 * Created by JoeLiu on 2017-10-27.
 */
var express = require('express');
var router = express.Router();
var CONSTANT = require("../config/constant.js");
var sessionAgent = require("./sessionAgent.js");
var rsaconfig = require('../config/rsaConfig');
/**
 * 如果Session验证失败，跳转到登录页面
 * 如果Session验证成功，继续执行
 */
router.all('/*', function (req, res, next) {
    if(req.method == 'GET'){
        res.sendStatus(404);
        //next();
        return;
    }
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    
    if (CONSTANT.sessionWhiteList.indexOf(req.path.toLowerCase()) > -1) {
        next();
        return;
    }
    var path=req.path.toLowerCase();
    if(req.session&&sessionAgent.getUserId(req)){
        next();
    }else{
        res.send({code:CONSTANT.code.sessionOut, msg: 'session time out'});
    }
});

router.post('/api/getPublicKey', function(req, res, next) {
    res.send({'publickey':rsaconfig.getpublickey()});
});
module.exports = router;
