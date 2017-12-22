/**
 * Created by admin on 2017-12-21.
 */
var express = require('express');
var router = express.Router();
var clinicServer =require('../service/clinicServer');
/* GET users listing. */
router.post('/create', function(req, res, next) {
    clinicServer.create(req, res, next);
});
router.post('/list', function(req, res, next) {
    clinicServer.list(req, res, next);
});
router.post('/get', function(req, res, next) {
    clinicServer.get(req, res, next);
});
router.post('/update', function(req, res, next) {
    clinicServer.update(req, res, next);
});
router.post('/delete', function(req, res, next) {
    clinicServer.deleteC(req, res, next);
});
router.post('/test', function(req, res, next) {
    clinicServer.test(req, res, next);
});



module.exports = router;