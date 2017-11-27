/**
 * Created by JoeLiu on 2017-11-24.
 */
var uuid = require('node-uuid');
var WebSocket = require('ws');
var redisUtil=require("../rutils/RedisUtil.js");


/*var aData=["test keys 1", "test val 1", "test keys 2", "test val 2"];

redisUtil.fHmset("AAA",aData).then(result=>{
    console.log(result);
    return result;
}).then(result=>{
        redisUtil.fHmget("AAA","test keys 1").then(res=>{
            console.log("res=========>",res);
        });
});*/



var WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({ port: 8053 });

var clients = [];
var socketData={};//{234211:[ws1,ws2],345645:[ws1,ws2]}

/**
 *
 * @type {number}
 */
function sendData(clientCode,umsg) {
    var userdata= socketData[clientCode];
    userdata&&userdata.forEach(item=>{
       // console.log("-------------------",item);
        item.send(JSON.stringify({"umsg":"-=-=-="+umsg||""+"-=-=-","message":"这是一个测试信息-------"}));
    });
}

var clientIndex = 1;
wss.on('connection', function(ws) {

    console.log("============YYYYYYYYY================");
    //console.log('ws',ws);
    var clientCode =getRandomData();
    var userWsData=socketData[clientCode]||[];
    userWsData.push(ws);
    socketData[clientCode]=userWsData;

    //console.log("socketData------------>",socketData);

    sendData(clientCode,clientCode);




    var connect_message =" has connected";
    console.log('client [%s] connected', clientCode);
    ws.on('message', function(message) {
        if (message.indexOf('_code_') === 0) {};
            var nickname_array = message.split(' ');
         sendData(clientCode,message);

    });
    function closeSocket(customMessage) {
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].id == client_uuid) {
                var disconnect_message;
                if (customMessage) {
                    disconnect_message = customMessage;
                } else {
                    disconnect_message = nickname + " has disconnected";
                }
                clients.splice(i, 1);
            }
        }
    };
    ws.on('close', function () {
     //console.log("onclose=================>",ws);
        closeSocket();
    });
    process.on('SIGINT', function () {
        console.log("Closing things");
        closeSocket('Server has disconnected');
        process.exit();
    });
});
/**
 * get 6 random  code
 * @returns {Number}
 */
function getRandomData(){
    let vacode=parseInt(Math.random()*1000000+1);
    return vacode<100000?getRandomData():vacode;
}