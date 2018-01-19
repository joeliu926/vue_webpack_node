/**
 * Created by admin on 2018-1-19.
 */
/**
 * Created by admin on 2018-1-19.
 */
/**
 * Created by admin on 2017-12-21.
 */
var express = require('express');
var router = express.Router();
var posterInfoServer =require('../../service/admin/posterInfoServer');
/* GET users listing. */
router.post('/addposter', function(req, res, next) {
    posterInfoServer.addposter(req, res, next);
});
router.post('/pagelist', function(req, res, next) {
    posterInfoServer.pagelist(req, res, next);
});
router.post('/posterdel', function(req, res, next) {
    posterInfoServer.posterdel(req, res, next);
});




module.exports = router;

