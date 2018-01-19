/**
 * Created by admin on 2018-1-19.
 */
/**
 * Created by admin on 2017-12-21.
 */
var express = require('express');
var router = express.Router();
var posterCategoryServer =require('../../service/admin/posterCategoryServer');
/* GET users listing. */
router.post('/addorupdate', function(req, res, next) {
    posterCategoryServer.addorupdate(req, res, next);
});
router.post('/list', function(req, res, next) {
    posterCategoryServer.list(req, res, next);
});
router.post('/addposter', function(req, res, next) {
    posterCategoryServer.addposter(req, res, next);
});





module.exports = router;
