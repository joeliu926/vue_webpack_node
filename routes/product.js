var express = require('express');
var router = express.Router();
var productServer =require('../service/productServer');
/* GET users listing. */
router.post('/searchList', function(req, res, next) {
    productServer.searchList(req, res, next);
});
router.post('/list', function(req, res, next) {
    productServer.list(req, res, next);
});


module.exports = router;