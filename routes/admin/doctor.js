/**
 * Created by admin on 2017-12-21.
 */
var express = require('express');
var router = express.Router();
var doctorServer =require('../../service/admin/doctorServer');
router.post('/create', function(req, res, next) {
    doctorServer.create(req, res, next);
});
router.post('/list', function(req, res, next) {
    doctorServer.list(req, res, next);
});
router.post('/get', function(req, res, next) {
    doctorServer.get(req, res, next);
});
router.post('/update', function(req, res, next) {
    doctorServer.update(req, res, next);
});
router.post('/delete', function(req, res, next) {
    doctorServer.deleteC(req, res, next);
});
router.post('/test', function(req, res, next) {
    doctorServer.test(req, res, next);
});



module.exports = router;
