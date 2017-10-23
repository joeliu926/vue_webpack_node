var express = require('express');
var router = express.Router();
var userServer =require('../service/userServer');
/* GET users listing. */
router.get('/userate', function(req, res, next) {
  userServer.userate(req, res, next);
});
router.get('/usertimes', function(req, res, next) {
  userServer.usertimes(req, res, next);
});
module.exports = router;
