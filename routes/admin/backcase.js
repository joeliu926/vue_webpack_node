var express = require('express');
var router = express.Router();
const sessionAgent = require('../../security/sessionAgent.js');
var backCaseServer =require('../../service/admin/backCaseServer');
/* GET users listing. */
router.post('/backcaselist', function(req, res, next) {
    backCaseServer.caselist(req, res, next);
});
router.post('/backcaseadd', function(req, res, next) {
    backCaseServer.caseadd(req, res, next);
});
router.post('/backcaseupdata', function(req, res, next) {
    backCaseServer.caseupdata(req, res, next);
});

router.post('/casedelete', function(req, res, next) {
    backCaseServer.casedelete(req, res, next);
});

router.post('/casedetail', function(req, res, next) {
    backCaseServer.casedetail(req, res, next);
});

router.post('/caseupdate', function(req, res, next) {
    backCaseServer.caseupdate(req, res, next);
});

router.post('/setdoctorlist', function(req, res, next) {
    backCaseServer.setdoctorlist(req, res, next);
});
router.post('/selectcaselist', function(req, res, next) {
    backCaseServer.selectcaselist(req, res, next);
});






module.exports = router;
