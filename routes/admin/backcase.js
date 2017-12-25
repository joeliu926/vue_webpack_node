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




module.exports = router;
