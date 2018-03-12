/**
 * Created by admin on 2017-12-21.
 */
var express = require('express');
var router = express.Router();
var mediaBaseServer =require('../../service/admin/mediaBaseServer');
/* GET users listing. */
router.post('/create', function(req, res, next) {
    mediaBaseServer.create(req, res, next);
});//
router.post('/uploadlocal', function(req, res, next) {
    mediaBaseServer.uploadlocal(req, res, next);
});//uploadlocal
router.post('/pagelist', function(req, res, next) {
    mediaBaseServer.pagelist(req, res, next);
});
router.post('/get', function(req, res, next) {
    mediaBaseServer.get(req, res, next);
});
router.post('/check', function(req, res, next) {
    mediaBaseServer.check(req, res, next);
});
router.post('/materialList', function(req, res, next) {
    mediaBaseServer.materialList(req, res, next);
});//
router.post('/thumbnail', function(req, res, next) {
    mediaBaseServer.thumbnail(req, res, next);
});//thumbnail
router.post('/test', function(req, res, next) {
    mediaBaseServer.test(req, res, next);
});



module.exports = router;
