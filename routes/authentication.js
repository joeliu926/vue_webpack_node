/**
 * Created by JoeLiu on 2017-10-27.
 */

var CONSTANT = require("../config/constant.js");
var sessionAgent = require("../utils/sessionAgent.js");
/**
 * 如果Session验证失败，跳转到登录页面
 * 如果Session验证成功，继续执行
 */
router.all('/*', function (req, res, next) {
    if(req.method == 'GET'){
        res.sendStatus(404);
        return;
    }
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    if (CONTANT.sessionWhiteList.indexOf(req.path.toLowerCase()) > -1) {
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
