var express = require('express');
var router = express.Router();
var jade = require('jade');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/login', { title: 'hahah' });
});

module.exports = router;
