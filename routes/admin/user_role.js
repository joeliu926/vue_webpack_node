var express = require('express');
var router = express.Router();
const sessionAgent = require('../../security/sessionAgent.js');
var userServer =require('../../service/admin/user_roleServer');
/* GET users listing. */
router.post('/rolelist', function(req, res, next) {
  userServer.rolelist(req, res, next);
});


router.post('/rolelistpage', function(req, res, next) {
  userServer.rolelistpage(req, res, next);
});

router.post('/userlist', function(req, res, next) {
  userServer.userlist(req, res, next);
});

router.post('/getuserinfo', function(req, res, next) {
  userServer.getuserinfo(req, res, next);
});

router.post('/getroleinfo', function(req, res, next) {
  userServer.getroleinfo(req, res, next);
});

router.post('/updateuser', function(req, res, next) {
  userServer.updateuser(req, res, next);
});
router.post('/updateuserrole', function(req, res, next) {
  userServer.updateuserrole(req, res, next);
});


router.post('/resetpwd', function(req, res, next) {
  userServer.resetpwd(req, res, next);
});

router.post('/unbind', function(req, res, next) {
  userServer.unbind(req, res, next);
});


router.post('/deleteuser', function(req, res, next) {
  userServer.deleteuser(req, res, next);
});


module.exports = router;
