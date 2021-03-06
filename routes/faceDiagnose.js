var express = require('express');
var router = express.Router();
var faceDiagnoseServer =require('../service/faceDiagnoseServer');
/* GET users listing. */
router.post('/getwaitinglist', function(req, res, next) {
    faceDiagnoseServer.getNotFaceDiagnoseList(req, res, next);
});
router.post('/getendlist', function(req, res, next) {
    faceDiagnoseServer.getEndList(req, res, next);
});
router.post('/finished', function(req, res, next) { //
    faceDiagnoseServer.finished(req, res, next);
});
router.post('/getCustomerData', function(req, res, next) { //
    faceDiagnoseServer.getCustomerData(req, res, next);
});

router.post('/newFaceDiagnose', function(req, res, next) { //newFaceDiagnose
    faceDiagnoseServer.newFaceDiagnose(req, res, next);
});
router.post('/getSingleDiagnose', function(req, res, next) { //getSingleDiagnose
    faceDiagnoseServer.getSingleDiagnose(req, res, next);
});
module.exports = router;