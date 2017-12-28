var express = require('express');
var router = express.Router();
var consultServer =require('../service/consultsServer');
/* GET users listing. */
router.post('/getrecords', function(req, res, next) {
    consultServer.getrecord(req, res, next);
});

router.post('/getrecords_scene', function(req, res, next) {
    consultServer.getrecord_scene(req, res, next);
});



module.exports = router;