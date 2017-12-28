/**
 * Created by JoeLiu on 2017-11-24.
 */

var WebSocket = require('ws');
var service =require('../service/ticketServer');
var codeMsg = require("../rconfig/error_code.json");
var wssPort=process.argv[2];
var WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({ port: wssPort, verifyClient: socketVerify});

var serverClients = [];

function socketVerify(info) {
    // var origin = info.origin.match(/^(:?.+\:\/\/)([^\/]+)/);
    //if (origin.length >= 3 && origin[2] == "hello.mc") {
    //    return true;
    //}
    return true;
}

wss.on('connection', function(ws,req) {
    let uuid = service.getUUID();
    let clientCode =0;

    console.log('req.url',req.url);
    if(req.url.indexOf('/tv')>-1){
        //return code and id after created connection from tv
        service.getCode(uuid,function (result) {
            serverClients.push({id:uuid,ws:ws});
            clientCode  = result;
            ws.send(JSON.stringify(
                {
                    type:'connected',
                    content:{
                        code:result,
                        id:uuid
                    }
                }
             ));
        });
    }else if(req.url.indexOf('/console') > -1){
        //return id after created connection from console
        ws.send(JSON.stringify(
            {
                type:'connected',
                content:{
                    sid:uuid
                }
            }
        ));
    }

    ws.on('message', function(message) {
        let _msg ='';
        if(typeof message=='string')
        {
            _msg =message;
        }
        else{
            _msg = JSON.stringify(message);
        }
        if(_msg.length<10) return;
        let msgObj = {};

        try{
            _msg =_msg.replace(/\s/g,'');
            msgObj = JSON.parse(_msg);
        }catch(e){
            ws.send(JSON.stringify(codeMsg.JSON_F));
            return;
        }
        
        switch (msgObj.type){
            case 'bind':
                service.updateSession(msgObj.content.code,msgObj.content.sid,function (result) {
                    if(result.code==0){
                        sendMessage('tv',msgObj.content.code,{
                            type:'bind_return',
                            content:codeMsg.success
                        },function (sendResult) {
                            if(sendResult.code==0){
                                ws.send(JSON.stringify(codeMsg.bind_S));
                            }
                            else{
                                ws.send(JSON.stringify(sendResult));
                            }
                        });
                    }
                    else{
                        ws.send(JSON.stringify(result));
                    }
                });
                break;

            case 'sbind':
                //The second binding
                service.updateSession(msgObj.content.code,msgObj.content.sid,function (result) {
                    if(result.code==0){
                        ws.send(JSON.stringify(codeMsg.bind_S));
                        sendMessage('tv',msgObj.content.code,{
                            type:'sbind_return',
                            content:codeMsg.success
                        },function () {});
                    }
                    else{
                        ws.send(JSON.stringify(codeMsg.bind_F));
                    }
                });
                break;

            case 'image':
                sendMessage('tv',msgObj.content.code,msgObj,function (msgresult) {
                    if(msgresult.code==0){
                        ws.send(JSON.stringify(codeMsg.send_S));
                    }else{
                        ws.send(JSON.stringify(codeMsg.send_F));
                    }
                });
                break;
            case 'closed':
                sendMessage('tv',msgObj.content.code,msgObj,function (msgresult) {
                    if(msgresult.code==0){
                        ws.send(JSON.stringify(codeMsg.close_S));
                    }else{
                        ws.send(JSON.stringify(codeMsg.close_F));
                    }
                });
                break;
            case 'delete':
                sendMessage('tv',msgObj.content.code,msgObj,function (msgresult) {
                    if(msgresult.code==0){
                        service.deleteSession(msgObj.content.code);
                        ws.send(JSON.stringify(codeMsg.delete_F));
                    }else{
                        ws.send(JSON.stringify(codeMsg.delete_S));
                    }
                });
                break;
        }
    });

    //destroy connection which is closed
    function closeSocket() {
        for (var i = 0; i < serverClients.length; i++) {
            if (serverClients[i].id == uuid) {
                serverClients.splice(i, 1);
                if(clientCode!=0){
                    service.deleteSession(clientCode);
                }
            }
        }
    };

    //send message(type = console or tv)
    function sendMessage(type, code, content,cb) {
        service.getSession(code,function (result) {
            if(result){
                let resObj =JSON.parse(result);
                if(resObj.state==1){
                    let confirmId = type =='tv'?resObj.cid:resObj.sid;
                    for (var i = 0; i < serverClients.length; i++) {
                        if(confirmId==serverClients[i].id){
                            var clientSocket = serverClients[i].ws;
                            if (clientSocket.readyState === WebSocket.OPEN) {
                                clientSocket.send(JSON.stringify(content));
                                cb&&cb({code:0,msg:'succeed'});
                            }
                        }
                    }
                }
                else{
                    cb&&cb(codeMsg.session_navF);
                }
            }
            else{
                cb&&cb(codeMsg.redis_findF);
            }
        });
    }

    ws.on('close', function (req) {
        closeSocket();
    });

    ws.on('error', function (req) {
        closeSocket();
    });

    /*process.on('SIGINT', function () {
        console.log("Closing things");
        closeSocket();
        process.exit();
    });*/
});
