var express = require('express');
var router = express.Router();
var userServer =require('../service/userServer');
/* GET users listing. */
router.post('/userate', function(req, res, next) {
  userServer.userate(req, res, next);
});

module.exports = router;
