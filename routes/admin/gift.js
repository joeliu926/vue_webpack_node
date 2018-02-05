/**
 * Created by admin on 2018-2-1.
 */
var express = require('express');
var router = express.Router();
const sessionAgent = require('../../security/sessionAgent.js');
var giftServer =require('../../service/admin/giftServer');
/* GET users listing. */


/*礼品列表页*/
router.post('/giftlist', function(req, res, next) {
    giftServer.giftlist(req, res, next);
});
/*添加页*/
router.post('/addgift', function(req, res, next) {
    giftServer.addgift(req, res, next);
});
/*下架*/
router.post('/giftdelte', function(req, res, next) {
    giftServer.giftdelte(req, res, next);
});
/*礼品详情*/
router.post('/editgift', function(req, res, next) {
    giftServer.editgift(req, res, next);
});
/*礼品详情更新*/
router.post('/editgiftNew', function(req, res, next) {
    giftServer.editgiftNew(req, res, next);
});







module.exports = router;
