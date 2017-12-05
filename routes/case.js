var express = require('express');
var router = express.Router();
var caseServer =require('../service/caseServer');
/* GET users listing. */
// router.post('/caselist', function(req, res, next) {
//     customerServer.clist(req, res, next);
// });
router.post('/casedetail', function(req, res, next) {
    console.log("------start get-------------");
    caseServer.getrecord(req, res, next);
});

// router.post('/filelist', function(req, res, next) {
//     customerServer.filelist(req, res, next);
// });

// router.post('/records', function(req, res, next) {
//     customerServer.records(req, res, next);
// });

// router.post('/records', function(req, res, next) {
//     customerServer.records(req, res, next);
// });


module.exports = router;