var express = require('express');
var router = express.Router();
var customerServer =require('../service/customerServer');
/* GET users listing. */
router.post('/customerlist', function(req, res, next) {
    customerServer.userate(req, res, next);
});

module.exports = router;