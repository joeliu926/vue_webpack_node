/**
 * Created by JoeLiu on 2017-10-30.
 */
/*import sessionAgent from './sessionAgent.js';
import CONSTANT from '../config/constant.js';*/
const sessionAgent = require('./sessionAgent.js');
const CONSTANT = require('../config/constant.js');
exports.loginEntry=function (req,res) {

    //login code
    if(true){
        console.log('00000000000000')
        sessionAgent.setUserId(req,'0001');
        res.send({
            code:0,
            msg:'登陆成功'
        });
        console.log('1111111111')
    }
    else{
        res.send({
            code:CONSTANT.code.loginErr,
            msg:'login failure'
        });
    }
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