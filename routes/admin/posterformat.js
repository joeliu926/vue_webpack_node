var express = require('express');
var router = express.Router();
var posterFormatServer =require('../../service/admin/posterFormatServer');
/**
 * 获取版式列表
 */
router.post('/pagelist', function(req, res, next) {
    posterFormatServer.pagelist(req, res, next);
});



module.exports = router;