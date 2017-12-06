var express = require('express');
var router = express.Router();
var customerServer =require('../service/customerServer');
/* GET users listing. */
router.post('/customerlist', function(req, res, next) {
    customerServer.clist(req, res, next);
});
router.post('/detail', function(req, res, next) {
    console.log("------start get-------------");
    customerServer.cdetail(req, res, next);
});

router.post('/filelist', function(req, res, next) {
    customerServer.filelist(req, res, next);
});

router.post('/update', function(req, res, next) {
    customerServer.update(req, res, next);
});

router.post('/records', function(req, res, next) {
    customerServer.records(req, res, next);
});


module.exports = router;