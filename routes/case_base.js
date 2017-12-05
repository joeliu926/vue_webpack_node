var express = require('express');
var router = express.Router();
var case_baseServer =require('../service/case_baseServer');
/* GET users listing. */
router.post('/getdata', function(req, res, next) {
    case_baseServer.getdata(req, res, next);
});


module.exports = router;
