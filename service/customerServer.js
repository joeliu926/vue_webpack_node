var CONSTANT=require('../config/constant');
var httpClient=require('../utils/httpClient');
var logingServer = require('../security/loginserver');

var defualtCfg={
    url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/dashboard/platform',
    contentType:'application/json'
};

function customerList(req, res, next){
    res.send({'aaa':'aaaaHHHHHHHHHHH'});
}

module.exports = {
    customerList: customerList
}