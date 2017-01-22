var express = require('express');
var router = express.Router();
var registerServer = require('../srevice/registerServer.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/login', { title: 'ace admin' });
});

//注册
router.post('/register', function(req, res, next){
	registerServer.Register(req.body, function(results){
		res.send(results);
	})
})
//用户名重复检测
router.post('/usernamerepeatcheck', function(req, res, next){
	registerServer.usernameRepeatCheck(req.body, function(results){
		res.send(results);
	})
})
//登录检查
router.post('/login', function(req, res, next){
	registerServer.login(req.body, function(data){
		res.send(data);
	})
})

module.exports = router;
