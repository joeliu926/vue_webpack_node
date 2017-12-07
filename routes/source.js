var express = require('express');
var router = express.Router();
var sourceServer =require('../service/sourceServer');
router.post('/list', function(req, res, next) {
    sourceServer.list(req, res, next);
});


module.exports = router;