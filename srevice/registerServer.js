var registerDao = require('../dao/register_dao.js');

module.exports.Register = function(values, callback){
	registerDao.Register(values, function(results){
		callback(results);
	})
}

module.exports.usernameRepeatCheck = function(values, callback){
	registerDao.usernameRepeatCheck(values, function(results){
		if(results.length == 0){
			callback(true);
		} else {
			callback(false);
		}
	})
}

module.exports.login = function(values, callback){
	registerDao.login(values, function(data){
		if(data.length == 0){
			callback(false);
		} else {
			callback(true);
		}
	})
}