var express = require('express');
var router = express.Router();
var caseHeaderServer =require('../service/caseHeaderServer');
/* GET users listing. */
router.post('/doctorlist', function(req, res, next) {
    caseHeaderServer.doctorList(req, res, next);
});



module.exports = router;