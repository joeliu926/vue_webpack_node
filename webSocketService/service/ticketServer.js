/**
 * Created by JoeLiu on 2017-11-29.
 */
var uuid = require('node-uuid');
var redisUtil=require("../utils/redisUtil.js");
var codeMsg = require("../rconfig/error_code.json");
/**
 * get random  code
 * @returns {Number}
 */
function getRandomData(minNum,maxNum){
   return  parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
}

function getUUID() {
    return uuid.v4();
}

function getCode(uuid,cb) {
    let rdmCode =getRandomData(100000,999999);
    getresult();
    function getresult() {
        redisUtil.fGet(rdmCode).then(function (result) {
            if(!result){
                cb&&cb(rdmCode);
                redisUtil.fSet(rdmCode,JSON.stringify({
                    code:rdmCode,
                    cid:uuid,
                    sid:'',
                    lastTime:Date.parse(new Date()),
                    state:0
                }));
            }else{
                rdmCode =getRandomData(100000,999999);
                getresult();
            }
        });
    }
}

function getSession(code,cb) {
    redisUtil.fGet(code).then(function (result) {
        cb&&cb(result);
    });
}

function updateSession(code,sid,cb) {
    redisUtil.fGet(code).then(function (result) {
        if(result){
            result=JSON.parse(result);
            redisUtil.fSet(code,JSON.stringify({
                code:code,
                cid:result.cid,
                sid:sid,
                lastTime:Date.parse(new Date()),
                state:1
            })).then(function () {
                cb&&cb(codeMsg.success);
            });
        }else{
            cb&&cb(codeMsg.redis_find_F);
        }
    });
}

function deleteSession(clientCode) {
    redisUtil.fDel(clientCode);
}

module.exports={
    getUUID:getUUID,
    getCode:getCode,
    getSession:getSession,
    updateSession:updateSession,
    deleteSession:deleteSession
};
