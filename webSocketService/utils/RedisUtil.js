var Q=require("q");
var redisConfig = require('../rconfig/redis_config.json');//// '127.0.0.1', // 123.207.213.50
var redis   = require('redis');
var RDS_PORT = redisConfig.port||6379;
var RDS_HOST = redisConfig.host||"127.0.0.1";
var RDS_PWD = redisConfig.database||0;
var RDS_OPTS = redisConfig.options||{};
var client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
var dbindex =redisConfig.dbIndex||0;

client.on("error", function(error) {
    console.log(error);
});
/**
 * set single field
 * @param key
 * @param value
 * @param dbindex db index
 * @returns {promise|*|e}
 */
function fSet(key,value){
    var deferred = Q.defer();
  /*  client.set(key,value, function(error, result) {
        if(error) {
            deferred.reject(error);
        } else {
            deferred.resolve(result);
        }
    });*/
    client.select(dbindex||"0", function(error){
        if(error) {
            deferred.reject(error);
        } else {
            client.set(key,value, function(error, result) {
                if(error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
}
/**
 * get data
 * @param key
 * @param dbindex db index
 * @returns {promise|*|e}
 */
function fGet(key){
    var deferred = Q.defer();
    client.select(dbindex||"0", function(error){
        if(error) {
            deferred.reject(error);
        } else {
            client.get(key, function(error, result) {
                if(error) {
                    deferred.reject(error);
                } else {
       
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
}
/**
 * delete data
 * @param key
 * @param dbindex  db index
 * @returns {promise|*|e}
 */
function fDel(key){
    var deferred = Q.defer();
    client.select(dbindex||"0", function(error){
        if(error) {
            deferred.reject(error);
        } else {
            client.del(key, function(error, result) {
                if(error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
}
/**
 * hset redis data fHmset("key","field","value")  result {"key":{"field1":"value1","field2":"value2"}}
 * @param key
 * @param field
 * @param dbindex
 * @returns {promise|*|e}
 */
function fHmset(key,value){
    var deferred = Q.defer();
    client.select(dbindex||"0", function(error){
        if(error) {
            deferred.reject(error);
        } else {
            client.hmset(key,value, function(error, result) {
                if(error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
}
/**
 * get object key
 * @param key
 * @param field
 * @param dbindex
 * @returns {promise|*|e}
 */
function fHmget(key,field){
    var deferred = Q.defer();
    client.select(dbindex||"0", function(error){
        if(error) {
            deferred.reject(error);
        } else {
            client.hmget(key,field,function(error, result) {
                if(error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
}
/**
 * get all object key data
 * @param key
 * @param dbindex
 * @returns {promise|*|e}
 */
function fHgetall(key){
    var deferred = Q.defer();
    client.select(dbindex||"0", function(error){
        if(error) {
            deferred.reject(error);
        } else {
            client.hgetall(key, function(error, result) {
                if(error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
}
/**
 * set array data
 * @param key
 * @param value
 * @param dbindex
 * @returns {promise|*|e}
 */
function fLpush(key,value){
    var deferred = Q.defer();

    client.select(dbindex||'0', function(error){
        if(error) {
            deferred.reject(error);
        } else {
            client.lpush(key,value);
            deferred.resolve("OK");
        }
    });
    return deferred.promise;
}
/**
 * get array data
 * @param key
 * @param start  index
 * @param end index
 * @param dbindex db index
 * @returns {promise|*|e}
 */
function fLrange(key,start,end){
    var deferred = Q.defer();

    client.select(dbindex||'0', function(error){
        if(error) {
            deferred.reject(error);
        } else {
            // lrange
            client.lrange(key, start||"0", end||"-1", function(error, result){
                if(error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(result);
                }
            });
        }
    });
    return deferred.promise;
}

module.exports={
    fSet:fSet,
    fGet:fGet,
    fDel:fDel,
    fHmset:fHmset,
    fHmget:fHmget,
    fHgetall:fHgetall,
    fLpush:fLpush,
    fLrange:fLrange
};


