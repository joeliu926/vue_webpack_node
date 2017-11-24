
var Q=require("q");
var redisConfig = require('../config/redis_config.json');//// '127.0.0.1', // 123.207.213.50
var redisPool = require('redis-connection-pool')('myRedisPool',redisConfig);
/**
 * 获取redis  demo
 * @param redis key
 * @returns {promise|*|e}
 */
function fGet(key){
    var deferred = Q.defer();
    redisPool.get(key, function (err, result) {
        // console.log("error-------",err);
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}
/**
 * redis set "key":"value"
 * @param key
 * @param value
 * @returns {promise|*|e}
 */
function fSet(key,value){
    var deferred = Q.defer();
    redisPool.set(key,value, function (err,result) {
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}
/**
 * delete redis
 * @param key
 * @returns {promise|*|e}
 */
function fDel(key){
    var deferred = Q.defer();
    // console.log("redisPool----------------",redisPool);
    redisPool.del(key, function (err, result) {
        //console.log("del-------",err,"--------",result);
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}
/**
 * hset redis data fHSet("key","field","value")  result {"key":{"field1":"value1","field2":"value2"}}
 * @param key
 * @param field
 * @param value
 * @returns {promise|*|e}
 */
function fHSet(key,field,value){
    var deferred = Q.defer();
    redisPool.hset(key,field,value, function (err,result) {
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}
/**
 * {"key":{"field1":"value1","field2":"value2"}}
 * hget redis fHGet("key", "field1") result "value1"
 * @param key
 * @param field if field is null ,result is {"field1":"value1","field2":"value2"}
 * @returns {promise|*|e}
 */
function fHGet(key, field){
    var deferred = Q.defer();
    // console.log("redisPool----------------",redisPool);
    redisPool.hget(key, field, function (err, result) {
        //console.log("hget-------",err,"--------",result);
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}
/**
 * source {"key":{"field1":"value1","field2":"value2"}}
 * fHGetAll("key") result {"field1":"value1","field2":"value2"}
 * @param key
 * @returns {promise|*|e}
 */
function fHGetAll(key){
    var deferred = Q.defer();
    // console.log("redisPool----------------",redisPool);
    redisPool.hgetall(key, function (err, result) {
        //console.log("hgetall-------",err,"--------",result);
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}
/**
 * source {"key":{"field1":"value1","field2":"value2"}}
 * delete data fHDel("key","field1")
 * @param key
 * @param field if field is null delete all under this obj,else del the specific field
 * @returns {promise|*|e}
 */
function fHDel(key,field){
    var deferred = Q.defer();
    redisPool.hdel(key,field, function (err, result) {
        //console.log(" fHDel-------",err,"--------",result);
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(result);
        }
    });
    return deferred.promise;
}
module.exports={
    fGet:fGet,
    fSet:fSet,
    fDel:fDel,
    fHSet:fHSet,
    fHGet:fHGet,
    fHGetAll:fHGetAll,
    fHDel:fHDel
};
/*fHSet("hkey","foobar42","CCC").then(function(res){
 console.log("==get=========",res);

 console.log("-------------",redisPool);
 fHGetAll("hkey").then(function(res){
 console.log("----222222222---------",redisPool);
 console.log("------------==-=-=-==-=",res);

 });
 fHDel("hkey","null");
 });*/

//redisPool.set('test-key1', 'foobar', function (err) {
//console.log("--------------------");
// redisPool.get('test-key', function (err, reply) {
// console.log(reply); // 'foobar'
// });
//});

