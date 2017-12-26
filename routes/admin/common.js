var express = require('express');
var router = express.Router();
var commonServer =require('../../service/admin/commonServer');
router.post('/prompt', function(req, res, next) {
  commonServer.prompt(req, res, next);
});


module.exports = router;
