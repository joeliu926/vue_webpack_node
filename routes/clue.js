var express = require('express');
var router = express.Router();
var clueServer =require('../service/clueServer');
/* GET users listing. */
router.post('/update', function(req, res, next) {
    clueServer.update(req, res, next);
});



module.exports = router;