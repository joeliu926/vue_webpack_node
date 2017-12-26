/**
 * Created by JoeLiu on 2017-10-23.
 */
function registor(req, res, next){
   // res.header("Access-Control-Allow-Origin","http://140.143.184.52:8001"); //http://localhost:8028 https://27478500.qcloud.la
    res.header("Access-Control-Allow-Origin","http://140.143.184.52:8001"); //http://localhost:8028 https://27478500.qcloud.la
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("XDomainRequestAllowed", "true");
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
}
module.exports = registor;
