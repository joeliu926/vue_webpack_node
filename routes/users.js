var express = require('express');
var router = express.Router();
var userServer =require('../service/userServer');
/* GET users listing. */
router.post('/userate', function(req, res, next) {
  userServer.userate(req, res, next);
});
router.post('/usertimes', function(req, res, next) {
  userServer.usertimes(req, res, next);
});

router.post('/login/entry', function(req, res, next) {
  userServer.loginEntry(req, res, next);
});

router.post('/loginout/entry', function(req, res, next) {
  userServer.loginOutEntry(req, res, next);
});

module.exports = router;
