/**
 * Created by admin on 2017-12-21.
 */
var express = require('express');
var router = express.Router();
var grabServer =require('../../service/admin/grabServer');
router.post('/single', function(req, res, next) {
    grabServer.single(req, res, next);
});
module.exports = router;
