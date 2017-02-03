var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next){
	console.log(req.query.username);
	res.render('home', {title: req.query.username});
})

module.exports = router;