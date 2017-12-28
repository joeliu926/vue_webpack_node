var express = require('express');
var router = express.Router();
var eventServer =require('../service/eventServer');
/* GET users listing. */
router.post('/v2', function(req, res, next) {
    eventServer.pcevent(req, res, next);
});



module.exports = router;