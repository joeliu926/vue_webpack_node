var express = require('express');
var router = express.Router();
const sessionAgent = require('../security/sessionAgent.js');
var userServer =require('../service/userServer');
/* GET users listing. */
router.post('/userate', function(req, res, next) {
  userServer.userate(req, res, next);
});
router.post('/usertimes', function(req, res, next) {
  userServer.usertimes(req, res, next);
});


router.post('/getuserinfo', function(req, res, next) {
  userServer.getuserinfo(req, res, next);
});

router.post('/login/entry', function(req, res, next) {
  userServer.loginEntry(req, res, next);
});

router.post('/loginout/entry', function(req, res, next) {
  userServer.loginOutEntry(req, res, next);
});


router.post('/checkloginstate', function(req, res, next) {
  //userServer.loginOutEntry(req, res, next);
  if(sessionAgent.getUserInfo(req)){
    res.send({code:0,msg:"Logined"})
  }
  else{
    res.send({code:-1,msg:"LoginOut"})
  }
});


module.exports = router;
