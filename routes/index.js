var express = require('express');
var router = express.Router();
var fCarrot = require('../functions/carrot.js');

/* GET home page. */
router.get('/', function(req, res, next) {

    var carrots = 0;

    fCarrot.getCarrot(carrots);

    res.render('index', { title: 'Little Big Pig' });
});

module.exports = router;
