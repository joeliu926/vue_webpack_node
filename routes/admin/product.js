/**
 * Created by admin on 2017-12-22.
 */
var express = require('express');
var router = express.Router();
var productServer =require('../../service/admin/productServer');
/* GET users listing. */

router.post('/list', function(req, res, next) {
    productServer.list(req, res, next);
});
router.post('/getProductModel', function(req, res, next) {
    productServer.getProductModel(req, res, next);
});
router.post('/select', function(req, res, next) {
    productServer.select(req, res, next);
});


module.exports = router;