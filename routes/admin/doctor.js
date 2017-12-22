/**
 * Created by admin on 2017-12-21.
 */
var express = require('express');
var router = express.Router();
var doctorServer =require('../../service/admin/doctorServer');
/* GET users listing. */
router.post('/test', function(req, res, next) {
    doctorServer.test(req, res, next);
});



module.exports = router;
