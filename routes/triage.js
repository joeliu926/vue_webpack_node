/**
 * Created by admin on 2017-12-5.
 */
var express = require('express');
var router = express.Router();
var triageServer =require('../service/triageServer');
/* GET users listing. */
router.post('/list', function(req, res, next) {
    triageServer.getlist(req, res, next);
});

// router.post('/casedetail', function(req, res, next) {
//     console.log("------start get-------------");
//     case_baseServer.getrecord(req, res, next);
// });
module.exports = router;
