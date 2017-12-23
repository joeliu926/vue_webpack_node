/**
 * Created by JoeLiu on 2017-10-23.
 */
var request = require('request');
const util = require('util');
var loger=require('./loger');
var querystring = require("querystring");
var requestType={
    'multipart/form-data':function(arg){
        request.post({url:arg.url, formData:arg.data,headers: {
            "authorization":arg.authorization
        }}, function (error, response, body) {
            util.isFunction(arg.callBack)&&arg.callBack(error, response, body);
        })
    },
    'application/x-www-form-urlencoded':function(arg){
        request.post({url:arg.url, form:arg.data,headers: {
            "authorization":arg.authorization
        }}, function(error, response, body) {
            util.isFunction(arg.callBack)&&arg.callBack(error, response, body);
        })
    },
    'application/json':function(arg){
        //console.log(arg.url,JSON.stringify(arg.data));
        loger.info(arg.url,JSON.stringify(arg.data));
        request({
            url:arg.url,//arg.url,
            method:arg.method, //"POST",
            //json: true,
            headers: {
                "content-type": "application/json",
                "authorization":arg.authorization
            },
            body:JSON.stringify(arg.data)
        }, function(error, response, body) {
            util.isFunction(arg.callBack)&&arg.callBack(error, response, body);
        });
    }
};
/**
 *
 * @param arg
 * arg {} url
 * arg {} method "POST/GET" 默认是GET
 * arg {} data 参数
 * arg {} callBack 回调
 * arg {} contentType  application/json；multipart/form-data；application/x-www-form-urlencoded
 */
module.exports = function(arg){
    if(arg.method=='POST' || arg.method=='PUT' || arg.method=='DELETE'){
        requestType[arg.contentType](arg);
    }else{
        var params=querystring.stringify(arg.data);
        arg.url+=/\?+/.test(arg.url)?'&'+params:'?'+params;
        request({url:arg.url,headers: {
            "authorization":arg.authorization
        }}, function (error, response, body) {
            util.isFunction(arg.callBack)&&arg.callBack(error, response, body);
        })
    }
};