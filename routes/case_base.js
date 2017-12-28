var express = require('express');
var router = express.Router();
var case_baseServer =require('../service/case_baseServer');
/* GET users listing. */
router.post('/getdata', function(req, res, next) {
    case_baseServer.getdata(req, res, next);
});
router.post('/caselibrary', function(req, res, next) {
    case_baseServer.caselibrary(req, res, next);
});
router.post('/casedetail', function(req, res, next) {
    console.log("------start get-------------");
    case_baseServer.getrecord(req, res, next);
});
router.post('/setfacephone', function(req, res, next) {
    case_baseServer.setFacePhone(req, res, next);
});
module.exports = router;
